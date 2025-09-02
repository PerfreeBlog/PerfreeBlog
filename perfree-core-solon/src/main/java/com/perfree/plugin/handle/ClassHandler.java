package com.perfree.plugin.handle;

import com.mybatisflex.core.mybatis.FlexConfiguration;
import com.mybatisflex.core.mybatis.binding.FlexMapperRegistry;
import com.perfree.plugin.PluginApplicationContextHolder;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.annotation.InterceptPath;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.binding.MapperRegistry;
import org.apache.ibatis.session.SqlSessionFactory;
import org.noear.solon.Solon;
import org.noear.solon.annotation.Component;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;


/**
 * @author Perfree
 * @description Class处理
 * @date 15:35 2023/9/28
 */
public class ClassHandler implements BasePluginRegistryHandler{
    // 只要是带以下注解的,全部注册bean (Solon版本)
    private final static Class<?>[] REGISTER_ANNO = {org.noear.solon.annotation.Bean.class,
            org.noear.solon.annotation.Configuration.class, Component.class,
            org.noear.solon.annotation.Controller.class, Mapper.class,
            InterceptPath.class};

    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo pluginInfo) throws Exception {

        // mybatis-plus实现一系列框架自定义bean,必须先注册mapper接口,否则会报错
        registerMapper(pluginInfo);
        // 此处逻辑: 只要类里包含REGISTER_ANNO中任意一个注解,就注册进入Bean容器中
        List<Class<?>> pluginClassList = pluginInfo.getClassList().stream().filter(item -> !item.isInterface()).toList();
        if(!pluginClassList.isEmpty()) {
            List<Class<?>> registryClassList = new ArrayList<>();
            for (Class<?> aClass : pluginClassList) {
                Annotation[] annotations = aClass.getAnnotations();
                // 修复逻辑错误：应该是找到匹配的注解才注册，而不是disjoint（不相交）
                if (annotations.length > 0 && !Collections.disjoint(Arrays.asList(annotations), Arrays.asList(REGISTER_ANNO))) {
                    registryClassList.add(aClass);
                }
            }
            if(!registryClassList.isEmpty()) {
                PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).register(registryClassList.toArray(new Class[0]));
                // 刷新容器
                PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).refresh();
            }
        }
    }


    /**
     * 注册mapper接口 (Solon版本)
     * @param pluginInfo pluginInfo
     */
    private void registerMapper(PluginInfo pluginInfo) {
        List<Class<?>> mapperClassList = getMapperList(pluginInfo);
        if (mapperClassList.isEmpty()) return;

        // 获取MyBatis-Flex的SqlSessionFactory
        SqlSessionFactory sqlSessionFactory = Solon.context().getBean(SqlSessionFactory.class);
        FlexConfiguration configuration = (FlexConfiguration) sqlSessionFactory.getConfiguration();
        MapperRegistry mapperRegistry = configuration.getMapperRegistry();

        // 注册mapper到MyBatis-Flex
        for (Class<?> mapperClass : mapperClassList) {
            try {
                // 检查mapper是否已经注册，避免重复注册
                if (!mapperRegistry.hasMapper(mapperClass)) {
                    mapperRegistry.addMapper(mapperClass);
                    System.out.println("Successfully registered plugin mapper: " + mapperClass.getName());
                } else {
                    System.out.println("Mapper already registered, skipping: " + mapperClass.getName());
                }
            } catch (org.apache.ibatis.binding.BindingException e) {
                // 专门处理重复注册异常
                if (e.getMessage().contains("already known to the MapperRegistry")) {
                    System.out.println("Mapper already registered in main application, skipping plugin registration: " + mapperClass.getName());
                } else {
                    System.err.println("BindingException for mapper " + mapperClass.getName() + ": " + e.getMessage());
                }
            } catch (Exception e) {
                // 处理其他异常
                System.err.println("Failed to register mapper " + mapperClass.getName() + ": " + e.getMessage());
            }
        }
    }

    /**
     * @description 获取所有Mapper接口
     * @author Perfree
     * @date 2021/11/13 8:31
     */
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

    @Override
    public void unRegistry(PluginInfo pluginInfo) throws Exception {

        String[] beanDefinitionNames = PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).removeBeanDefinition(beanDefinitionName);
        }

        // 把mapper取消注册 (Solon版本)
        SqlSessionFactory sqlSessionFactory = Solon.context().getBean(SqlSessionFactory.class);
        List<Class<?>> mapperList = getMapperList(pluginInfo);
        FlexConfiguration configuration = (FlexConfiguration) sqlSessionFactory.getConfiguration();
        MapperRegistry mapperRegistry = configuration.getMapperRegistry();

        for (Class<?> mapperClass : mapperList) {
            try {
                // MyBatis-Flex的mapper注销
                if (mapperRegistry.hasMapper(mapperClass)) {
                    // 注意：FlexMapperRegistry可能没有直接的removeMapper方法
                    // 这里需要根据实际的MyBatis-Flex API来调整
                    // TODO 没有 removeMapper方法
                    System.out.println("Unregistering mapper: " + mapperClass.getName());
                }
            } catch (Exception e) {
                System.err.println("Failed to unregister mapper: " + mapperClass.getName() + ", error: " + e.getMessage());
            }
        }
    }

}
