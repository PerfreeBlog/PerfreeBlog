package com.perfree.plugin;

import cn.hutool.setting.dialect.Props;
import com.perfree.plugin.utils.PluginsUtils;
import org.apache.commons.lang3.StringUtils;
import org.pf4j.PluginWrapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @description Plugin信息
 * @author Perfree
 * @date 2021/11/9 14:26
 */
public class PluginInfo {
    // jar classList
    private List<Class<?>> classList;

    private ApplicationContext mainApplicationContext;
    private Boolean applicationContextIsRefresh = false;

    private AnnotationConfigApplicationContext pluginApplicationContext;

    private PluginWrapper pluginWrapper;

    private List<Class<?>> adminGroupsClassList = new ArrayList<>();

    private List<String> websocketPaths = new ArrayList<>();

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
        this.mainApplicationContext = applicationContext;
        this.pluginApplicationContext = getContext();
        this.basePlugin = (BasePlugin) pluginWrapper.getPlugin();
        this.pluginApplicationContext.setParent(mainApplicationContext);
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
     * 清理ApplicationContext
     */
    public void clearApplicationContext(){
        PluginApplicationContextHolder.removePluginApplicationContext(this.getPluginId().trim());
        this.getPluginApplicationContext().getDefaultListableBeanFactory().destroySingletons();
        this.getPluginApplicationContext().close();
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
        String[] staticLocations = locations.split(",");
        for (String staticLocation : staticLocations) {
            if (staticLocation.contains("classpath:")){
                staticLocation = staticLocation.replace("classpath:", "");
                if (StringUtils.isNotBlank(staticLocation) && staticLocation.startsWith("/")){
                    staticLocation = staticLocation.substring(1);
                }
                this.staticClassPathLocations.add(staticLocation);
            } else {
                this.staticFileLocations.add(staticLocation);
            }
        }
    }


    public Boolean getApplicationContextIsRefresh() {
        return applicationContextIsRefresh;
    }

    public void setApplicationContextIsRefresh(Boolean applicationContextIsRefresh) {
        this.applicationContextIsRefresh = applicationContextIsRefresh;
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

    public List<String> getWebsocketPaths() {
        return websocketPaths;
    }

    public void setWebsocketPaths(List<String> websocketPaths) {
        this.websocketPaths = websocketPaths;
    }
}
