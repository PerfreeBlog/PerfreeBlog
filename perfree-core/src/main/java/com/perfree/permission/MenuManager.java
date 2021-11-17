package com.perfree.permission;

import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.util.IdUtil;
import com.perfree.commons.Constants;
import com.perfree.plugin.PluginInfo;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.stereotype.Controller;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.*;

/**
 * @description 菜单管理
 * @author Perfree
 * @date 2021/11/11 8:38
 */
public class MenuManager {
    private final static Logger LOGGER = LoggerFactory.getLogger(MenuManager.class);
    // 存储了系统所有的菜单组
    public final static List<AdminMenuGroup> SYSTEM_MENU_LIST = Collections.synchronizedList(new ArrayList<>());
    // 存储了每个插件的菜单组
    public final static Map<String, List<AdminMenuGroup>> PLUGIN_MENU_MAPS = Collections.synchronizedMap(new HashMap<>());
    // 存储了系统默认自带的菜单组
    public final static List<AdminMenuGroup> SYSTEM_DEFAULT_MENU_LIST = Collections.synchronizedList(new ArrayList<>());
    /** 
     * @description 初始化系统菜单分组
     * @author Perfree
     */ 
    public static void initSystemMenuGroup() {
        AdminMenuGroup home = new AdminMenuGroup();
        home.setGroupId(Constants.ADMIN_MENU_GROUP_HOME);
        home.setIcon("fa-home");
        home.setName("主页");
        home.setUrl("/admin/dashboard");
        home.setSeq(1);
        home.setId(IdUtil.simpleUUID());
        home.setRole(ListUtil.toList(Constants.ROLE_ADMIN, Constants.ROLE_CONTRIBUTE, Constants.ROLE_EDITOR,Constants.ROLE_USER));

        AdminMenuGroup writeArticle = new AdminMenuGroup();
        writeArticle.setGroupId(Constants.ADMIN_MENU_GROUP_WRITE_ARTICLE);
        writeArticle.setIcon("fa-pencil-square-o");
        writeArticle.setUrl("/admin/article/addPage");
        writeArticle.setName("写文章");
        writeArticle.setSeq(2);
        writeArticle.setId(IdUtil.simpleUUID());
        writeArticle.setRole(ListUtil.toList(Constants.ROLE_ADMIN, Constants.ROLE_CONTRIBUTE, Constants.ROLE_EDITOR));

        AdminMenuGroup content = new AdminMenuGroup();
        content.setGroupId(Constants.ADMIN_MENU_GROUP_CONTENT);
        content.setIcon("fa-inbox");
        content.setName("内容管理");
        content.setSeq(3);
        content.setId(IdUtil.simpleUUID());
        content.setRole(ListUtil.toList(Constants.ROLE_ADMIN, Constants.ROLE_CONTRIBUTE, Constants.ROLE_EDITOR));

        AdminMenuGroup theme = new AdminMenuGroup();
        theme.setGroupId(Constants.ADMIN_MENU_GROUP_THEME);
        theme.setIcon("fa-tachometer");
        theme.setName("主题管理");
        theme.setSeq(4);
        theme.setId(IdUtil.simpleUUID());
        theme.setRole(ListUtil.toList(Constants.ROLE_ADMIN));

        AdminMenuGroup plugin = new AdminMenuGroup();
        plugin.setGroupId(Constants.ADMIN_MENU_GROUP_PLUGIN);
        plugin.setIcon("fa-leaf");
        plugin.setUrl("/admin/plugin");
        plugin.setName("插件管理");
        plugin.setSeq(5);
        plugin.setId(IdUtil.simpleUUID());
        plugin.setRole(ListUtil.toList(Constants.ROLE_ADMIN));

        AdminMenuGroup setting = new AdminMenuGroup();
        setting.setGroupId(Constants.ADMIN_MENU_GROUP_PLUGIN);
        setting.setIcon("fa-sliders");
        setting.setName("网站设置");
        setting.setUrl("/admin/setting");
        setting.setSeq(6);
        setting.setId(IdUtil.simpleUUID());
        setting.setRole(ListUtil.toList(Constants.ROLE_ADMIN));

        SYSTEM_DEFAULT_MENU_LIST.add(home);
        SYSTEM_DEFAULT_MENU_LIST.add(writeArticle);
        SYSTEM_DEFAULT_MENU_LIST.add(content);
        SYSTEM_DEFAULT_MENU_LIST.add(theme);
        SYSTEM_DEFAULT_MENU_LIST.add(plugin);
        SYSTEM_DEFAULT_MENU_LIST.add(setting);
        SYSTEM_MENU_LIST.addAll(SYSTEM_DEFAULT_MENU_LIST);
    }

    /** 
     * @description 初始化系统菜单
     * @author Perfree
     */
    public static List<AdminMenuGroup> initSystemMenu() {
        initSystemMenuGroup();
        List<Class<?>> controllerClassList = initSystemControllerClasses();
        return initAdminMenu(controllerClassList, SYSTEM_MENU_LIST);
    }


    /**
     * @description 初始化系统controller 类
     * @author Perfree
     */
    private static List<Class<?>> initSystemControllerClasses() {
        List<Class<?>> controllerClassList = Collections.synchronizedList(new ArrayList<>());
        try{
            ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
            String pattern = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX + ClassUtils.convertClassNameToResourcePath("com.perfree.controller") + "/**/*.class";
            Resource[] resources = resourcePatternResolver.getResources(pattern);
            for (Resource resource : resources) {
                if(resource.isReadable()) {
                    MetadataReader metadataReader = new CachingMetadataReaderFactory().getMetadataReader(resource);
                    Class<?> clazz = ClassUtils.getDefaultClassLoader().loadClass(metadataReader.getAnnotationMetadata().getClassName());
                    controllerClassList.add(clazz);
                }
            }
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("Register Menu-> Scanner system controller error:{}", e.getMessage());
        }
        return controllerClassList;
    }

    /**
     * @description 初始化系统菜单项
     * @author Perfree
     * @date 2021/11/10 14:35
     * @return
     */
    public static List<AdminMenuGroup> initAdminMenu(List<Class<?>> classList,List<AdminMenuGroup> adminMenuGroups) {
        for (Class<?> clazz : classList) {
            if(clazz.getAnnotation(Controller.class) != null || clazz.getAnnotation(RestController.class) != null) {
                for (Method method : clazz.getMethods()) {
                    AdminMenu annotation = AnnotationUtils.getAnnotation(method, AdminMenu.class);
                    if(annotation != null) {
                        MenuItem menuItem = new MenuItem();
                        menuItem.setGroupId(annotation.groupId());
                        menuItem.setName(annotation.name());
                        menuItem.setSeq(annotation.seq());
                        menuItem.setUrl(getMenuUrl(clazz, method));
                        menuItem.setRole(Arrays.asList(annotation.role()));
                        menuItem.setId(IdUtil.simpleUUID());
                        AdminMenuGroup adminMenuGroup = matchAdminGroupMenu(menuItem.getGroupId(), adminMenuGroups);
                        if (adminMenuGroup != null) {
                            adminMenuGroup.getMenuItems().add(menuItem);
                        }
                    }
                }
            }
        }
        return adminMenuGroups;
    }

    /** 
     * @description 匹配菜单组
     * @return com.perfree.permission.AdminMenuGroup
     * @author Perfree
     */ 
    public static AdminMenuGroup matchAdminGroupMenu(String groupId,List<AdminMenuGroup> systemAdminMenuGroups){
        for (AdminMenuGroup adminMenuGroup : systemAdminMenuGroups) {
            if (adminMenuGroup.getGroupId().equals(groupId)) {
                return adminMenuGroup;
            }
        }
        return null;
    }

    /**
     * @description  获取菜单url
     * @author Perfree
     */
    public static String getMenuUrl(Class<?> clazz, Method method) {
        RequestMapping requestMapping = AnnotationUtils.findAnnotation(clazz, RequestMapping.class);

        String methodUrl = "";
        RequestMapping methodRequestMapping = AnnotationUtils.findAnnotation(method, RequestMapping.class);
        if(methodRequestMapping != null && methodRequestMapping.value().length > 0) {
            methodUrl = methodRequestMapping.value()[0];
        }

        GetMapping getMapping = AnnotationUtils.getAnnotation(method, GetMapping.class);
        if(getMapping != null && getMapping.value().length > 0) {
            methodUrl = getMapping.value()[0];
        }

        PostMapping postMapping = AnnotationUtils.getAnnotation(method, PostMapping.class);
        if(postMapping != null && postMapping.value().length > 0) {
            methodUrl = postMapping.value()[0];
        }

        DeleteMapping deleteMapping = AnnotationUtils.getAnnotation(method, DeleteMapping.class);
        if(deleteMapping != null && deleteMapping.value().length > 0) {
            methodUrl = deleteMapping.value()[0];
        }

        PatchMapping patchMapping = AnnotationUtils.getAnnotation(method, PatchMapping.class);
        if(patchMapping != null && patchMapping.value().length > 0) {
            methodUrl = patchMapping.value()[0];
        }

        PutMapping putMapping = AnnotationUtils.getAnnotation(method, PutMapping.class);
        if(putMapping != null && putMapping.value().length > 0) {
            methodUrl = putMapping.value()[0];
        }

        if(StringUtils.isBlank(methodUrl)) return null;

        if(requestMapping == null || requestMapping.value().length <= 0) {
            return methodUrl;
        }
        return requestMapping.value()[0] + methodUrl;
    }

    /**
     * 根据 groupId 获取AdminMenuGroup
     * @param groupId  groupId
     * @return AdminMenuGroup
     */
    public static AdminMenuGroup getAdminMenuGroupByGroupId(String groupId) {
        for (AdminMenuGroup adminMenuGroup : SYSTEM_MENU_LIST) {
            if (adminMenuGroup.getGroupId().equals(groupId)) {
                return adminMenuGroup;
            }
        }
        return null;
    }

    /**
     * 是否为系统默认菜单组
     * @return boolean
     */
    public static boolean isSystemDefaultAdminMenuGroup(String groupId){
        for (AdminMenuGroup adminMenuGroup : SYSTEM_DEFAULT_MENU_LIST) {
            if (adminMenuGroup.getGroupId().equals(groupId)) {
                return true;
            }
        }
        return false;
    }
}
