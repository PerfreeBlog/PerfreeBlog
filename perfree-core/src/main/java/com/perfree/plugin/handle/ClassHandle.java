package com.perfree.plugin.handle;

import com.perfree.permission.AdminGroups;
import com.perfree.plugin.BasePlugin;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.handle.base.BasePluginHandle;
import org.apache.ibatis.annotations.Mapper;
import org.pf4j.PluginWrapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.stream.Collectors;

/**
 * @description 自定义Class Register
 * @author Perfree
 * @date 2021/11/9 14:23
 */
public class ClassHandle implements BasePluginHandle {
    private final static Class<?>[] REGISTER_ANNO = {Bean.class, Configuration.class, Component.class,RestController.class,
            Controller.class, Mapper.class, Service.class, Repository.class};

    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        List<Class<?>> classList = new ArrayList<>();
        List<Class<?>> adminGroupsClassList = new ArrayList<>();
        Set<String> classPackageName = scanClassPackageName(plugin.getBasePlugin().scanPackage(), plugin.getBasePlugin().getWrapper());
        for (String packageName : classPackageName) {
            ClassLoader pluginClassLoader = plugin.getPluginWrapper().getPluginClassLoader();
            Class<?> clazz = pluginClassLoader.loadClass(packageName);
            if (!BasePlugin.class.isAssignableFrom(clazz)) {
                classList.add(clazz);
            }
            AdminGroups annotation = clazz.getAnnotation(AdminGroups.class);
            if (annotation != null) {
                adminGroupsClassList.add(clazz);
            }
        }

        plugin.setClassList(classList);
        plugin.setAdminGroupsClassList(adminGroupsClassList);

        List<Class<?>> pluginClassList = plugin.getClassList().stream().filter(item -> !item.isInterface()).collect(Collectors.toList());
        if(!pluginClassList.isEmpty()) {
            List<Class<?>> registryClassList = new ArrayList<>();
            for (Class<?> aClass : pluginClassList) {
                Annotation[] annotations = aClass.getAnnotations();
                if (annotations.length > 0 && Collections.disjoint(Arrays.asList(annotations), Arrays.asList(REGISTER_ANNO))) {
                    registryClassList.add(aClass);
                }
            }
            if(!registryClassList.isEmpty()) {
                plugin.getPluginApplicationContext().register(registryClassList.toArray(new Class[0]));
            }
        }
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
    }


    /**
     * 扫描jar包中的类。
     *
     * @param basePackage 包名
     * @param pluginWrapper jar的PluginWrapper
     * @return 类全路径
     * @throws IOException 扫描异常
     */
    public static Set<String> scanClassPackageName(String basePackage, PluginWrapper pluginWrapper) throws IOException {
        String pluginPath = pluginWrapper.getPluginPath().toString();
        Set<String> classPackageNames = new HashSet<>();
        try (JarFile jarFile = new JarFile(pluginPath)) {
            Enumeration<JarEntry> jarEntries = jarFile.entries();
            while (jarEntries.hasMoreElements()) {
                JarEntry entry = jarEntries.nextElement();
                String jarEntryName = entry.getName();
                if (jarEntryName.contains(".class") && jarEntryName.replaceAll("/", ".").startsWith(basePackage)) {
                    String className = jarEntryName.substring(0, jarEntryName.lastIndexOf(".")).replace("/", ".");
                    classPackageNames.add(className);
                }
            }
        }
        return classPackageNames;
    }
}
