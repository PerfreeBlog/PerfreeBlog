package com.perfree.plugin.register;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.io.file.FileWriter;
import cn.hutool.core.util.CharsetUtil;
import com.perfree.plugin.PluginInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.builder.xml.XMLMapperBuilder;
import org.apache.ibatis.executor.ErrorContext;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.defaults.DefaultSqlSession;
import org.mybatis.spring.mapper.MapperFactoryBean;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.core.NestedIOException;
import org.springframework.util.ClassUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.net.JarURLConnection;
import java.net.URL;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.regex.Pattern;

/**
 * @description 自定义Mybatis Mapper注册
 * @author Perfree
 * @date 2021/11/9 14:24
 */
public class MapperRegister implements PluginRegister{
    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        List<Class<?>> mapperClassList = getMapperList(plugin);
        if (mapperClassList.isEmpty()) return;

        //注册mapper
        for (Class<?> mapperClass : mapperClassList) {
            GenericBeanDefinition definition = new GenericBeanDefinition();
            definition.getConstructorArgumentValues().addGenericArgumentValue(mapperClass);
            definition.setBeanClass(MapperFactoryBean.class);
            definition.getPropertyValues().add("addToConfig", true);
            definition.setAutowireMode(AbstractBeanDefinition.AUTOWIRE_BY_TYPE);
            plugin.getPluginApplicationContext().registerBeanDefinition(mapperClass.getName(), definition);
        }

        //注册mapper.xml
        SqlSessionFactory sqlSessionFactory = (SqlSessionFactory) plugin.getMainApplicationContext().getBean("sqlSessionFactory");
        Configuration configuration = sqlSessionFactory.getConfiguration();
        try {
            Resources.setDefaultClassLoader(plugin.getPluginWrapper().getPluginClassLoader());
            List<File> files = scanMapperXml(plugin);

            for (File file : files) {
                if(file == null) continue;
                InputStream inputStream = null;
                try {
                    FileReader fileReader = new FileReader(file.getAbsolutePath());
                    inputStream = fileReader.getInputStream();
                    XMLMapperBuilder xmlMapperBuilder = new XMLMapperBuilder(inputStream,
                            configuration, file.getAbsolutePath(), configuration.getSqlFragments());
                    xmlMapperBuilder.parse();
                } catch (Exception e) {
                    throw new NestedIOException("Failed to parse mapping resource: '" + file.getAbsolutePath() + "'", e);
                } finally {
                    if (inputStream != null) {
                        inputStream.close();
                    }
                    ErrorContext.instance().reset();
                }
            }
            files.clear();
        } finally {
            Resources.setDefaultClassLoader(ClassUtils.getDefaultClassLoader());
        }
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        List<Class<?>> mapperClassList = getMapperList(plugin);
        if (mapperClassList.isEmpty()) return;

        for (Class<?> mapperClass : mapperClassList) {
            plugin.getPluginApplicationContext().removeBeanDefinition(mapperClass.getName());
        }
        SqlSessionFactory sqlSessionFactory = (SqlSessionFactory) plugin.getMainApplicationContext().getBean("sqlSessionFactory");
        Configuration configuration = sqlSessionFactory.getConfiguration();
        clearValues(configuration, "mappedStatements");
        clearValues(configuration, "caches");
        clearValues(configuration, "resultMaps");
        clearValues(configuration, "parameterMaps");
        clearValues(configuration, "keyGenerators");
        clearValues(configuration, "sqlFragments");
        Field loadedResourcesField = configuration.getClass().getDeclaredField("loadedResources");
        loadedResourcesField.setAccessible(true);
        ((Set<?>) loadedResourcesField.get(configuration)).clear();
        File file = new File("resources/pluginResources/"+plugin.getPluginId());
        FileUtil.del(file.getAbsolutePath());
    }

    /**
     * @description 获取所有Mapper接口
     * @author Perfree
     * @date 2021/11/13 8:31
     */
    private List<Class<?>> getMapperList(PluginInfo plugin){
        List<Class<?>> mapperClassList = new ArrayList<>();

        for (Class<?> aClass : plugin.getClassList()) {
            Mapper annotation = aClass.getAnnotation(Mapper.class);
            if (annotation != null) {
                mapperClassList.add(aClass);
            }
        }
        return mapperClassList;
    }

    private void clearValues(Configuration configuration, String fieldName) throws Exception {

        Field field = configuration.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        Map<?, ?> map = (Map<?, ?>) field.get(configuration);
        DefaultSqlSession.StrictMap<Object> newMap = new DefaultSqlSession.StrictMap<Object>();
        for (Object key : map.keySet()) {
            try {
                newMap.put((String) key, map.get(key));
            } catch (IllegalArgumentException ex) {
                newMap.put((String) key, ex.getMessage());
            }
        }
        field.set(configuration, newMap);
    }

    /**
     * 扫描jar包中的mapper.xml
     */
    public static List<File> scanMapperXml(PluginInfo plugin) throws IOException {
        String pluginPath = plugin.getPluginWrapper().getPluginPath().toString();
        List<File> files = new ArrayList<>();
        String xmlLocationPattern = plugin.getMapperXmlDir();
        xmlLocationPattern = xmlLocationPattern.replaceAll("\\*\\*", "<>").replaceAll("\\*", "<>")
                .replaceAll("\\.", "\\.").replaceAll("<>", ".*");

        File jarFile = new File(pluginPath);
        Enumeration<JarEntry> jarEntries = new JarFile(jarFile).entries();
        while (jarEntries.hasMoreElements()) {
            JarEntry entry = jarEntries.nextElement();
            String jarEntryName = entry.getName();
            if (Pattern.matches(xmlLocationPattern, jarEntryName) && jarEntryName.endsWith(".xml")) {
                URL url = new URL("jar:file:" + jarFile.getAbsolutePath() + "!/" + jarEntryName);
                JarURLConnection jarConnection = (JarURLConnection) url.openConnection();
                InputStream in = jarConnection.getInputStream();
                File file = new File("resources/pluginResources/"+plugin.getPluginId());
                if (!file.exists()){
                    FileUtil.mkdir(file);
                }
                FileUtil.clean(file.getAbsolutePath());
                File xmlFile = new File(file.getAbsolutePath() + "/" + jarEntryName);
                FileWriter writer = new FileWriter(xmlFile);
                String read = IoUtil.read(in, CharsetUtil.UTF_8);
                files.add(xmlFile);

                in.close();
                JarFile currJarFile = jarConnection.getJarFile();
                currJarFile.close();
                writer.write(read);
            }
        }
        return files;
    }
}
