package com.perfree.plugin.register;

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
import org.springframework.core.io.Resource;
import org.springframework.util.ClassUtils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
            for (Resource mapperXmlResource : plugin.getMapperXmlResourceList()) {
                if(mapperXmlResource == null) continue;

                if(!mapperXmlResource.getFilename().endsWith(".xml")) continue;

                try {
                    XMLMapperBuilder xmlMapperBuilder = new XMLMapperBuilder(mapperXmlResource.getInputStream(),
                            configuration, mapperXmlResource.toString(), configuration.getSqlFragments());
                    xmlMapperBuilder.parse();
                } catch (Exception e) {
                    throw new NestedIOException("Failed to parse mapping resource: '" + mapperXmlResource + "'", e);
                } finally {
                    ErrorContext.instance().reset();
                }
            }
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
    }

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
}
