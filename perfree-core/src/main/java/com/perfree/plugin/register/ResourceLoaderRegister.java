package com.perfree.plugin.register;

import com.perfree.plugin.PluginInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.util.ClassUtils;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * @description 插件资源加载
 * @author Perfree
 * @date 2021/11/9 9:43
 */
public class ResourceLoaderRegister implements PluginRegister{

    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver(plugin.getPluginWrapper().getPluginClassLoader());
        String pluginBasePath = ClassUtils.classPackageAsResourcePath(plugin.getPluginWrapper().getPlugin().getClass());
        //扫描plugin所有的类class文件
        Resource[] classResources = pathMatchingResourcePatternResolver.getResources(PathMatchingResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX + pluginBasePath + "/**/*.class");
        plugin.setClassResourceList(new ArrayList<>(Arrays.asList(classResources)));

        //扫描mybatis mapper.xml文件
        if (StringUtils.isNotBlank(plugin.getMapperXmlDir())) {
            Resource[] mapperXmlResources = pathMatchingResourcePatternResolver.getResources(plugin.getMapperXmlDir());
            plugin.setMapperXmlResourceList(new ArrayList<>(Arrays.asList(mapperXmlResources)));
        }

    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        plugin.getClassResourceList().clear();
        plugin.getMapperXmlResourceList().clear();
    }
}
