package com.perfree.plugins;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.setting.Setting;
import com.jfinal.template.Directive;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.directive.BaseDirective;
import com.perfree.directive.TemplateDirective;
import org.mybatis.spring.mapper.ClassPathMapperScanner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.*;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * @description 插件相关工具
 * @author Perfree
 * @date 2021/8/13 11:56
 */
public class PluginsUtil extends ClassLoader{
    private final Logger logger = LoggerFactory.getLogger(PluginsUtil.class);
    private DefaultListableBeanFactory defaultListableBeanFactory = null;
    private final List<String> classNameList = new ArrayList<>();
    private URLClassLoader classLoader = null;
    public static URLClassLoader classLoader2  = null;


    public PluginsUtil() {
        ConfigurableApplicationContext configurableApplicationContext = (ConfigurableApplicationContext) SpringBeanUtils.getApplicationContext();
        defaultListableBeanFactory = (DefaultListableBeanFactory) configurableApplicationContext.getBeanFactory();
        classLoader = (URLClassLoader) configurableApplicationContext.getClassLoader();
    }

    /**
     * 初始化插件
     */
    public void initPlugins(){
        File[] jarFiles = readJarFiles();
        if (jarFiles == null || jarFiles.length == 0) {
            return;
        }
        Method method = null;
        boolean accessible = false;
        try{
            method = URLClassLoader.class.getDeclaredMethod("addURL", URL.class);
            accessible = method.isAccessible();
            for (File jarFile : jarFiles) {
                if (!accessible) {
                    method.setAccessible(true);
                }
                logger.info("加载插件:{}", jarFile.getName());
                URL url = jarFile.toURI().toURL();
                method.invoke(classLoader, url);
                PluginsUtil.classLoader2 = classLoader;
                initClassNameList(jarFile);
                registryBean();
                classNameList.clear();
            }
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("加载插件出现异常:{}", e.getMessage());
        } finally {
           if (method != null){
               method.setAccessible(accessible);
           }
        }
    }

    public void installJar(File file) throws Exception {
        Method method = null;
        boolean accessible = false;
        try {
            method = URLClassLoader.class.getDeclaredMethod("addURL", URL.class);
            accessible = method.isAccessible();
            if (!accessible) {
                method.setAccessible(true);
            }
            URL url = file.toURI().toURL();
            method.invoke(classLoader, url);
            initClassNameList(file);
            registryBean();
            classNameList.clear();
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("加载插件出现异常:{}", e.getMessage());
            throw new Exception("加载插件出现异常:" + e.getMessage());
        } finally {
            if (method != null){
                method.setAccessible(accessible);
            }
        }
    }


    /**
     * 获取插件目录内所有jar
     * @return File[]
     */
    private File[] readJarFiles() {
        File file = new File("resources/plugins");
        List<File> jarFiles = new ArrayList<>();
        if (!file.exists()) {
            return null;
        }
        File[] files = file.listFiles();
        if (files == null) {
            return null;
        }
        for (File listFile : files) {
            if (listFile.getName().endsWith(".jar")){
                jarFiles.add(listFile);
            }
        }
        File[] result = new File[jarFiles.size()];
        return jarFiles.toArray(result);
    }

    /**
     * 初始化获取jar包内所有类
     * @param jarFile jarFile
     * @throws IOException IOException
     */
    private void initClassNameList(File jarFile) throws Exception {
        Enumeration<JarEntry> entries = new JarFile(jarFile).entries();
        while (entries.hasMoreElements()) {
            JarEntry jarEntry = entries.nextElement();
            String entryName = jarEntry.getName();
            if (!jarEntry.isDirectory() && entryName.endsWith(".class")) {
                String className = entryName.replace("/", ".").substring(0, entryName.length() - 6);
                classNameList.add(className);
            }
        }
    }


    /**
     * @description 加载插件配置文件
     * @param jarFile jarFile
     * @author Perfree
     */
    public static Setting getSetting(File jarFile) throws Exception {
        Enumeration<JarEntry> entries = new JarFile(jarFile).entries();
        while (entries.hasMoreElements()) {
            JarEntry jarEntry = entries.nextElement();
            String entryName = jarEntry.getName();
            if (entryName.equals("plugin.setting")) {
                URL url = new URL("jar:file:" + jarFile.getPath() + "!/" + entryName);
                JarURLConnection jarConnection = (JarURLConnection) url
                        .openConnection();
                InputStream in = jarConnection.getInputStream();
                String read = IoUtil.read(in, CharsetUtil.UTF_8);
                in.close();
                File file = new File("resources/temp");
                if (!file.exists()) {
                    if (!file.mkdirs()) {
                        throw new IOException("加载插件:临时目录创建失败");
                    }
                }
                File tempFile = new File(file.getAbsolutePath() + "/plugin.setting");
                FileWriter writer = new FileWriter(tempFile);
                writer.write(read);
                writer.flush();
                writer.close();
                Setting setting = new Setting(tempFile, CharsetUtil.CHARSET_UTF_8, false);
                if (setting.isEmpty()) {
                    throw new Exception("加载插件:插件内配置文件无内容");
                }
                return setting;
            }
        }
        throw new Exception("加载插件:读取配置文件失败");
    }


    /**
     * 注册bean
     */
    private void registryBean(){
        // 加载class,注册进入springboot bean
        classNameList.forEach(className -> {
            try {
                Class<?> loadClass = classLoader.loadClass(className);
                if (PluginController.class.isAssignableFrom(loadClass)) {
                    registerController(loadClass, className);
                }
                if (PluginService.class.isAssignableFrom(loadClass)) {
                    registerService(loadClass, className);
                }
                if (PluginMapper.class.isAssignableFrom(loadClass)) {
                    registerMapper(className);
                }
                if (BaseDirective.class.isAssignableFrom(loadClass)) {
                    registerTemplateDirective(loadClass);
                }
                if (Plugin.class.isAssignableFrom(loadClass)){
                    pluginInit(loadClass, 1);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    /**
     * @description 渲染模板指令
     */
    private void registerTemplateDirective(Class<?> loadClass) throws InstantiationException, IllegalAccessException {
        TemplateDirective injectBean = loadClass.getAnnotation(TemplateDirective.class);
        Class<? extends Directive> directiveByName = JFinalViewResolver.me().getEngine().getEngineConfig().getDirective(injectBean.value());
        if (directiveByName == null) {
            logger.info("Add Directive: {}", injectBean.value());
            Directive directive = (Directive) loadClass.newInstance();
            JFinalViewResolver.me().addDirective(injectBean.value(), directive.getClass());
        }
    }


    /**
     * 注册controller
     * @param loadClass loadClass
     * @param className className
     * @throws Exception Exception
     */
    private void registerController(Class<?> loadClass, String className) throws Exception {
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.rootBeanDefinition(loadClass);
        defaultListableBeanFactory.registerBeanDefinition(loadClass.getSimpleName(),beanDefinitionBuilder.getBeanDefinition());
        final RequestMappingHandlerMapping requestMappingHandlerMapping = SpringBeanUtils.getApplicationContext().getBean(RequestMappingHandlerMapping.class);
        Method method=requestMappingHandlerMapping.getClass().getSuperclass().getSuperclass().getDeclaredMethod("detectHandlerMethods",Object.class);
        method.setAccessible(true);
        method.invoke(requestMappingHandlerMapping, loadClass.getSimpleName());
        logger.info("注册controller:{}", className);
    }

    /**
     * 注册service
     * @param loadClass loadClass
     * @param className className
     */
    private void registerService(Class<?> loadClass, String className){
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.rootBeanDefinition(loadClass);
        defaultListableBeanFactory.registerBeanDefinition(loadClass.getSimpleName(),beanDefinitionBuilder.getBeanDefinition());
        logger.info("注册service:{}", className);
    }

    /**
     * 注册mapper
     * @param className className
     */
    private void registerMapper(String className){
        ClassPathMapperScanner scanner = new ClassPathMapperScanner(defaultListableBeanFactory);
        scanner.registerFilters();
        scanner.doScan(className.substring(0, className.lastIndexOf(".")));
        logger.info("注册mapper:{}", className);
    }

    /**
     * 初始化插件
     * @param loadClass loadClass
     * @throws Exception e
     */
    private void pluginInit(Class<?> loadClass, int type) throws Exception {
        switch (type) {
            case 1:
                Method onStart = loadClass.getMethod("onStart");
                onStart.invoke(loadClass.newInstance());
                break;
            case 2:
                Method onUpdate = loadClass.getMethod("onUpdate");
                onUpdate.invoke(loadClass.newInstance());
                break;
            case 3:
                Method onInstall = loadClass.getMethod("onInstall");
                onInstall.invoke(loadClass.newInstance());
                break;
            case 4:
                Method onUnInstall = loadClass.getMethod("onUnInstall");
                onUnInstall.invoke(loadClass.newInstance());
                break;
        }
    }

    public void unloadJarFiles(File file) throws Exception {
    }

}
