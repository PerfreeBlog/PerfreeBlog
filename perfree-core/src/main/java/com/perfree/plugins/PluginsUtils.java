package com.perfree.plugins;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.lang.JarClassLoader;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.setting.Setting;
import com.jfinal.template.Directive;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.common.Constants;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.directive.BaseDirective;
import com.perfree.directive.TemplateDirective;
import org.apache.ibatis.annotations.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.net.JarURLConnection;
import java.net.URL;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * @description 插件相关工具
 * @author Perfree
 * @date 2021/8/13 11:56
 */
public class PluginsUtils extends ClassLoader{
    private static final Logger logger = LoggerFactory.getLogger(PluginsUtils.class);
    private static final List<String> classNameList = new ArrayList<>();
    private static JarClassLoader jarClassLoader  = null;
    private static final List<HashMap<String, JarClassLoader>> jarClassLoaders = new ArrayList<>();
    public static final List<JarClassLoader> jarClassLoaderList = new ArrayList<>();
    /**
     * 初始化插件
     */
    public static void initPlugins(){
        File[] jarFiles = readJarFiles();
        if (jarFiles == null || jarFiles.length == 0) {
            return;
        }
        try{
            for (File jarFile : jarFiles) {
                installJar(jarFile, Constants.PLUGIN_TYPE_START);
            }
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("加载插件出现异常:{}", e.getMessage());
        }
    }

    /**
     * @description 安装jar
     * @author Perfree
     */
    public static void installJar(File file, int type) throws Exception {
        try {
            jarClassLoader = JarClassLoader.loadJar(file);
            HashMap<String, JarClassLoader> currClassLoader = new HashMap<>();
            currClassLoader.put(file.getName(), jarClassLoader);
            jarClassLoaders.add(currClassLoader);
            jarClassLoaderList.add(jarClassLoader);
            initClassNameList(file);
            registryBean(type);
            classNameList.clear();
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("加载插件出现异常:{}", e.getMessage());
            throw new Exception("加载插件出现异常:" + e.getMessage());
        }
    }


    /**
     * 获取插件目录内所有jar
     * @return File[]
     */
    private static File[] readJarFiles() {
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
    private static void initClassNameList(File jarFile) throws Exception {
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
                JarURLConnection jarConnection = (JarURLConnection) url.openConnection();
                InputStream in = jarConnection.getInputStream();
                String read = IoUtil.read(in, CharsetUtil.UTF_8);
                in.close();
                JarFile currJarFile = jarConnection.getJarFile();
                currJarFile.close();
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
    private static void registryBean(int type){
        try {
            List<Class<?>> controllerList = new ArrayList<>();
            List<Class<?>> serviceList = new ArrayList<>();
            Class<?> pluginInitClass = null;
            Class<?> templateDirectiveClass = null;
            // 加载class,注册进入springboot bean
            for (String className : classNameList) {
                Class<?> loadClass = jarClassLoader.loadClass(className);
                if (loadClass.getAnnotation(Controller.class) != null || loadClass.getAnnotation(RestController.class) != null) {
                    PluginBeanRegister.registerBeanDefinition(loadClass);
                    controllerList.add(loadClass);
                }
                if (loadClass.getAnnotation(Service.class) != null) {
                    PluginBeanRegister.registerBeanDefinition(loadClass);
                    serviceList.add(loadClass);
                }
                if (loadClass.getAnnotation(Mapper.class) != null) {
                    PluginBeanRegister.registerBeanDefinition(loadClass);
                }
                if (BaseDirective.class.isAssignableFrom(loadClass)) {
                    templateDirectiveClass = loadClass;
                }
                if (Plugin.class.isAssignableFrom(loadClass)){
                    pluginInitClass = loadClass;
                }
            }

            // 这里必须要先尝试获取下serviceBean,否则二次注册controller会出错
            for (Class<?> serviceClass : serviceList) {
                Object service = SpringBeanUtils.getBean(PluginBeanRegister.lowerFirstCase(serviceClass.getSimpleName()));
                logger.info("扩展插件 => service Bean 注册验证:{}", service.getClass().getName());
            }
            // 注册controller handle
            controllerList.forEach(loadClass -> {
                PluginBeanRegister.registerMapping(PluginBeanRegister.lowerFirstCase(loadClass.getSimpleName()));
            });
            controllerList.clear();
            // 加载模板指令
            if (templateDirectiveClass != null) {
                registerTemplateDirective(templateDirectiveClass);
            }

            // 执行初始方法
            if (pluginInitClass != null) {
                pluginInit(pluginInitClass, type);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * @description 渲染模板指令
     */
    private static void registerTemplateDirective(Class<?> loadClass) throws InstantiationException, IllegalAccessException {
        TemplateDirective injectBean = loadClass.getAnnotation(TemplateDirective.class);
        Class<? extends Directive> directiveByName = JFinalViewResolver.me().getEngine().getEngineConfig().getDirective(injectBean.value());
        if (directiveByName == null) {
            logger.info("扩展插件 => Add Directive: {}", injectBean.value());
            Directive directive = (Directive) loadClass.newInstance();
            JFinalViewResolver.me().addDirective(injectBean.value(), directive.getClass());
        }
    }


    /**
     * 初始化插件
     * @param loadClass loadClass
     * @throws Exception e
     */
    private static void pluginInit(Class<?> loadClass, int type) throws Exception {
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

    /** 
     * @description 卸载jar
     * @param file  file
     * @author Perfree
     */ 
    public static void unloadJarFiles(File file, int type) throws Exception {
        HashMap<String, JarClassLoader> removeClassLoader = null;
        for (HashMap<String, JarClassLoader> classLoader : jarClassLoaders) {
            if (classLoader.get(file.getName()) != null) {
                initClassNameList(file);
                removeBean(classLoader.get(file.getName()), type);
                classNameList.clear();
                classLoader.get(file.getName()).close();
                removeClassLoader = classLoader;
                forceDelete(file);
            }
        }
        if (removeClassLoader != null) {
            jarClassLoaders.remove(removeClassLoader);
            jarClassLoaderList.remove(removeClassLoader.get(file.getName()));
        }
    }

    /**
     * @description 移除bean
     * @author Perfree
     */
    public static void removeBean(JarClassLoader classLoader, int type) {
        try {
            Class<?> controllerLoadClass = null;
            for (String className : classNameList) {
                Class<?> loadClass = null;
                loadClass = classLoader.loadClass(className);
                if (loadClass.getAnnotation(Controller.class) != null || loadClass.getAnnotation(RestController.class) != null) {
                    PluginBeanRegister.removeBean(loadClass);
                    controllerLoadClass = loadClass;
                }
                if (loadClass.getAnnotation(Service.class) != null) {
                    PluginBeanRegister.removeBean(loadClass);
                }
                if (loadClass.getAnnotation(Mapper.class) != null) {
                    PluginBeanRegister.removeBean(loadClass);
                }
                if (Plugin.class.isAssignableFrom(loadClass) && type == Constants.PLUGIN_TYPE_UNINSTALL){
                    pluginInit(loadClass, type);
                }
            }
            PluginBeanRegister.unregisterController(controllerLoadClass);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static boolean forceDelete(File file) {
        if (!file.exists()) {
            return false;
        }

        boolean result = file.delete();
        if (result) {
            return true;
        }
        int tryCount = 0;
        while (!result && tryCount++ < 10) {
            System.gc();
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            result = file.delete();
        }
        return result;
    }
}
