package com.perfree.plugin;

import cn.hutool.setting.dialect.Props;
import com.perfree.plugin.utils.PluginsUtils;
import org.apache.commons.lang3.StringUtils;
import org.pf4j.PluginWrapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.*;

/**
 * @description Plugin信息
 * @author Perfree
 * @date 2021/11/9 14:26
 */
public class PluginInfo {
    // jar classList
    private List<Class<?>> classList = new ArrayList<>();

    private ApplicationContext mainApplicationContext;

    private AnnotationConfigApplicationContext pluginApplicationContext;

    private List<Resource> classResourceList = new ArrayList<>();;

    private List<Resource> mapperXmlResourceList= new ArrayList<>();;

    private PluginWrapper pluginWrapper;

    private List<Class<?>> adminGroupsClassList = new ArrayList<>();;

    private String pluginId;

    private String mapperXmlDir;
    private final BasePlugin basePlugin;

    private  List<HandlerInterceptor> handlerInterceptorList = new ArrayList<>();

    private Set<String> staticClassPathLocations = new HashSet<>();
    private Set<String> staticFileLocations = new HashSet<>();

    public PluginInfo(PluginWrapper pluginWrapper, ApplicationContext applicationContext) throws Exception {
        this.pluginId = pluginWrapper.getPluginId();
        this.pluginWrapper = pluginWrapper;
        this.classList = new ArrayList<>();
        this.classResourceList = new ArrayList<>();
        this.mainApplicationContext = applicationContext;
        this.pluginApplicationContext = getContext();
        this.basePlugin = (BasePlugin) pluginWrapper.getPlugin();
        this.pluginApplicationContext.setParent(mainApplicationContext);
        this.mapperXmlResourceList = new ArrayList<>();
        Props setting = PluginsUtils.getSetting(pluginWrapper.getPluginPath().toFile());
        if (!setting.isEmpty()){
            this.mapperXmlDir = setting.getStr("mybatis.mapper.location", null);
            String locations = setting.getStr("static.locations", null);
            if (StringUtils.isNotBlank(locations)) {
                loadResources(locations);
            }

        }
    }

    /**
     * @description  获取插件内实现指定类的bean
     * @param c class
     * @return java.util.List<java.lang.Class<?>>
     * @author Perfree
     */
    public <T> T getPluginBean(Class<T> c) {
        try{
            return pluginApplicationContext.getBean(c);
        }catch (Exception e) {
            return null;
        }
    }

    public List<HandlerInterceptor> getHandlerInterceptorList() {
        return handlerInterceptorList;
    }

    public void setHandlerInterceptorList(List<HandlerInterceptor> handlerInterceptorList) {
        this.handlerInterceptorList = handlerInterceptorList;
    }

    private void loadResources(String locations){
        List<String> staticLocations = Arrays.asList(locations.split(","));
        for (String staticLocation : staticLocations) {
            if (staticLocation.contains("classpath:")){
                this.staticClassPathLocations.add(staticLocation.replace("classpath:",""));
            } else {
                this.staticFileLocations.add(staticLocation);
            }
        }
    }

    public BasePlugin getBasePlugin() {
        return basePlugin;
    }

    public List<Class<?>> getAdminGroupsClassList() {
        return adminGroupsClassList;
    }

    public void setAdminGroupsClassList(List<Class<?>> adminGroupsClassList) {
        this.adminGroupsClassList = adminGroupsClassList;
    }

    public PluginWrapper getPluginWrapper() {
        return pluginWrapper;
    }

    public void setPluginWrapper(PluginWrapper pluginWrapper) {
        this.pluginWrapper = pluginWrapper;
    }

    public Set<String> getStaticClassPathLocations() {
        return staticClassPathLocations;
    }

    public void setStaticClassPathLocations(Set<String> staticClassPathLocations) {
        this.staticClassPathLocations = staticClassPathLocations;
    }

    public Set<String> getStaticFileLocations() {
        return staticFileLocations;
    }

    public void setStaticFileLocations(Set<String> staticFileLocations) {
        this.staticFileLocations = staticFileLocations;
    }

    public String getPluginId() {
        return pluginId;
    }

    public void setPluginId(String pluginId) {
        this.pluginId = pluginId;
    }

    public String getMapperXmlDir() {
        if (StringUtils.isNotBlank(mapperXmlDir) && mapperXmlDir.startsWith("classpath:")){
            mapperXmlDir = mapperXmlDir.replace("classpath:","");
        }
        if (StringUtils.isNotBlank(mapperXmlDir) && mapperXmlDir.startsWith("/")){
            mapperXmlDir = mapperXmlDir.substring(1);
        }
        return mapperXmlDir;
    }

    public void setMapperXmlDir(String mapperXmlDir) {
        this.mapperXmlDir = mapperXmlDir;
    }

    public List<Class<?>> getClassList() {
        return classList;
    }

    public void setClassList(List<Class<?>> classList) {
        this.classList = classList;
    }

    public List<Resource> getClassResourceList() {
        return classResourceList;
    }

    public void setClassResourceList(List<Resource> classResourceList) {
        this.classResourceList = classResourceList;
    }

    public List<Resource> getMapperXmlResourceList() {
        return mapperXmlResourceList;
    }

    public void setMapperXmlResourceList(List<Resource> mapperXmlResourceList) {
        this.mapperXmlResourceList = mapperXmlResourceList;
    }

    public void setPluginApplicationContext(AnnotationConfigApplicationContext pluginApplicationContext) {
        this.pluginApplicationContext = pluginApplicationContext;
    }

    public AnnotationConfigApplicationContext getPluginApplicationContext() {
       return pluginApplicationContext;
    }



    private AnnotationConfigApplicationContext getContext() {
        AnnotationConfigApplicationContext pluginApplicationContext = PluginApplicationContextHolder.getApplicationContext(pluginWrapper.getPluginId());
        if(pluginApplicationContext == null) pluginApplicationContext = new AnnotationConfigApplicationContext();

        pluginApplicationContext.setClassLoader(pluginWrapper.getPluginClassLoader());
        PluginApplicationContextHolder.addPluginApplicationContext(pluginWrapper.getPluginId(), pluginApplicationContext);
        return PluginApplicationContextHolder.getApplicationContext(pluginWrapper.getPluginId());
    }

    public ApplicationContext getMainApplicationContext() {
        return mainApplicationContext;
    }

    public void setMainApplicationContext(ApplicationContext mainApplicationContext) {
        this.mainApplicationContext = mainApplicationContext;
    }

    @Override
    public String toString() {
        return "Plugin{" +
                "classList=" + classList +
                ", mainApplicationContext=" + mainApplicationContext +
                ", pluginApplicationContext=" + pluginApplicationContext +
                ", classResourceList=" + classResourceList +
                ", mapperXmlResourceList=" + mapperXmlResourceList +
                ", pluginWrapper=" + pluginWrapper +
                ", pluginId='" + pluginId + '\'' +
                ", mapperXmlDir='" + mapperXmlDir + '\'' +
                ", staticClassPathLocations=" + staticClassPathLocations +
                ", staticFileLocations=" + staticFileLocations +
                '}';
    }
}
