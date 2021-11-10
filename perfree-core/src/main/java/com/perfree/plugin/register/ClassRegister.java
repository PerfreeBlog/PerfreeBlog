package com.perfree.plugin.register;

import com.perfree.directive.BaseDirective;
import com.perfree.plugin.BasePlugin;
import com.perfree.plugin.PluginInfo;
import org.springframework.core.io.Resource;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReader;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @description 自定义Class Register
 * @author Perfree
 * @date 2021/11/9 14:23
 */
public class ClassRegister implements PluginRegister{
    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        List<Class<?>> classList = new ArrayList<>();
        for (Resource resource : plugin.getClassResourceList()) {
            if(resource.isReadable()) {
                MetadataReader metadataReader = new CachingMetadataReaderFactory().getMetadataReader(resource);
                Class clazz = plugin.getPluginWrapper().getPluginClassLoader().loadClass(metadataReader.getAnnotationMetadata().getClassName());
                if (!BasePlugin.class.isAssignableFrom(clazz)) {
                    classList.add(clazz);
                }
            }
        }
        plugin.setClassList(classList);


        List<Class<?>> pluginClassList = plugin.getClassList().stream().filter(item -> !item.isInterface()).collect(Collectors.toList());
        if(!pluginClassList.isEmpty()) {
            List<Class<?>> registryClassList = new ArrayList<>();
            for (Class<?> aClass : pluginClassList) {
                registryClassList.add(aClass);
            }
            if(!registryClassList.isEmpty()) {
                plugin.getPluginApplicationContext().register(registryClassList.toArray(new Class[registryClassList.size()]));
            }
        }
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {

    }
}
