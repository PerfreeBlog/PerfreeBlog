package com.perfree.plugins;

import com.perfree.commons.SpringBeanUtils;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.mapper.ClassPathMapperScanner;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

public class PluginsUtil extends ClassLoader{
    private DefaultListableBeanFactory defaultListableBeanFactory = null;
    private final List<String> classNameList = new ArrayList<>();

    public PluginsUtil() {
        ConfigurableApplicationContext configurableApplicationContext = (ConfigurableApplicationContext) SpringBeanUtils.getApplicationContext();
        defaultListableBeanFactory = (DefaultListableBeanFactory) configurableApplicationContext.getBeanFactory();
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
                URLClassLoader classLoader = (URLClassLoader) ClassLoader.getSystemClassLoader();
                URL url = jarFile.toURI().toURL();
                method.invoke(classLoader, url);
                initClassNameList(jarFile);
                registryBean();
                classNameList.clear();
            }
        }catch (Exception e) {
            e.printStackTrace();
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
            File[] jars = listFile.listFiles((dir, name) -> name.endsWith(".jar"));
            if (jars != null){
                jarFiles.addAll(Arrays.asList(jars));
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
    private void initClassNameList(File jarFile) throws IOException {
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
     * 注册bean
     */
    private void registryBean(){
        // 加载class,注册进入springboot bean
        classNameList.forEach(className -> {
            try {
                Class<?> loadClass = loadClass(className);
                pluginInit(loadClass);
                // 注册Controller
                if (loadClass.getAnnotation(RestController.class) != null || loadClass.getAnnotation(Controller.class) != null){
                    registerController(loadClass, className);
                }
                // 注册service
                if (loadClass.getAnnotation(Service.class) != null){
                    registerService(loadClass, className);
                }
                // 注册mapper
                if (loadClass.getAnnotation(Mapper.class) != null) {
                    registerMapper(className);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        });
    }


    /**
     * 注册controller
     * @param loadClass loadClass
     * @param className className
     * @throws Exception Exception
     */
    private void registerController(Class<?> loadClass, String className) throws Exception {
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.rootBeanDefinition(loadClass);
        defaultListableBeanFactory.registerBeanDefinition(className,beanDefinitionBuilder.getBeanDefinition());
        final RequestMappingHandlerMapping requestMappingHandlerMapping = SpringBeanUtils.getApplicationContext().getBean(RequestMappingHandlerMapping.class);
        Method method=requestMappingHandlerMapping.getClass().getSuperclass().getSuperclass().getDeclaredMethod("detectHandlerMethods",Object.class);
        method.setAccessible(true);
        method.invoke(requestMappingHandlerMapping, className);
    }

    /**
     * 注册service
     * @param loadClass loadClass
     * @param className className
     */
    private void registerService(Class<?> loadClass, String className){
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.rootBeanDefinition(loadClass);
        defaultListableBeanFactory.registerBeanDefinition(className,beanDefinitionBuilder.getBeanDefinition());
    }

    /**
     * 注册mapper
     * @param className className
     */
    private void registerMapper(String className){
        ClassPathMapperScanner scanner = new ClassPathMapperScanner(defaultListableBeanFactory);
        scanner.registerFilters();
        scanner.doScan(className.substring(0, className.lastIndexOf(".")));
    }

    /**
     * 初始化插件
     * @param loadClass loadClass
     * @throws Exception e
     */
    private void pluginInit(Class<?> loadClass) throws Exception {
        if (Plugin.class.isAssignableFrom(loadClass)) {
            Method onStart = loadClass.getMethod("onStart");
            onStart.invoke(loadClass.newInstance());
            Method configEngine = loadClass.getMethod("configEngine");
            configEngine.invoke(loadClass.newInstance());
        }
    }
}
