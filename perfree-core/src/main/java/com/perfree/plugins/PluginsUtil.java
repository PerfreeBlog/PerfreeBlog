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
        File file = new File("resources/plugins");
        if (!file.exists()) {
            return;
        }
        File[] jarFiles = file.listFiles((dir, name) -> name.endsWith(".jar"));
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
            System.out.println(e.getMessage());
        } finally {
           if (method != null){
               method.setAccessible(accessible);
           }
        }
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
                Class<?>[] interfaces = loadClass.getInterfaces();
                for (Class<?> anInterface : interfaces) {
                    if (anInterface.getName().equals(Plugin.class.getName())){
                        Method onStart = loadClass.getMethod("onStart");
                        onStart.invoke(loadClass.newInstance());
                    }
                }
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
                    registerMapper(loadClass, className);
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
     * @param loadClass loadClass
     * @param className className
     */
    private void registerMapper(Class<?> loadClass, String className){
        ClassPathMapperScanner scanner = new ClassPathMapperScanner(defaultListableBeanFactory);
        scanner.registerFilters();
        scanner.doScan(className.substring(0, className.lastIndexOf(".")));
    }
}
