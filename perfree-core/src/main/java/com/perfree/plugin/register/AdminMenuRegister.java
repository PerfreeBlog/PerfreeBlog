package com.perfree.plugin.register;

import cn.hutool.core.util.IdUtil;
import com.perfree.permission.AdminGroup;
import com.perfree.permission.AdminGroups;
import com.perfree.permission.AdminMenuGroup;
import com.perfree.permission.MenuManager;
import com.perfree.plugin.PluginInfo;
import com.perfree.service.MenuService;
import org.springframework.context.ApplicationContext;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @description 插件菜单注册
 * @author Perfree
 * @date 2021/11/11 8:33
 */
public class AdminMenuRegister implements PluginRegister{

    ApplicationContext applicationContext;

    public AdminMenuRegister(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        MenuService baseMenuService = applicationContext.getBean(MenuService.class);
        List<AdminMenuGroup> adminMenuGroups = getAdminMenuGroups(plugin);
        baseMenuService.addPluginSystemMenu(adminMenuGroups);
        MenuManager.PLUGIN_MENU_MAPS.put(plugin.getPluginId(), adminMenuGroups);
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        MenuService baseMenuService = applicationContext.getBean(MenuService.class);
        List<AdminMenuGroup> adminMenuGroups = MenuManager.PLUGIN_MENU_MAPS.get(plugin.getPluginId());
        if (adminMenuGroups != null && adminMenuGroups.size() > 0) {
            baseMenuService.removePluginSystemMenu(adminMenuGroups);
            MenuManager.PLUGIN_MENU_MAPS.remove(plugin.getPluginId());
        }
    }

    private List<AdminMenuGroup> getAdminMenuGroups(PluginInfo plugin){
        List<AdminMenuGroup> adminMenuGroups = new ArrayList<>();
        for (Class<?> aClass : plugin.getAdminGroupsClassList()) {
            AdminGroups annotation = aClass.getAnnotation(AdminGroups.class);
            AdminGroup[] groups = annotation.groups();
            for (AdminGroup adminGroup : groups) {
                AdminMenuGroup adminMenuGroupByGroupId = MenuManager.getAdminMenuGroupByGroupId(adminGroup.groupId());
                AdminMenuGroup adminMenuGroup = new AdminMenuGroup();
                if (adminMenuGroupByGroupId != null) {
                    adminMenuGroup.setId(adminMenuGroupByGroupId.getId());
                    adminMenuGroup.setGroupId(adminMenuGroupByGroupId.getGroupId());
                } else {
                    adminMenuGroup.setGroupId(adminGroup.groupId());
                    adminMenuGroup.setIcon(adminGroup.icon());
                    adminMenuGroup.setName(adminGroup.name());
                    adminMenuGroup.setRole(Arrays.asList(adminGroup.role()));
                    adminMenuGroup.setSeq(adminGroup.seq());
                    adminMenuGroup.setId(IdUtil.simpleUUID());
                    adminMenuGroup.setUrl(adminGroup.url());
                }
                adminMenuGroups.add(adminMenuGroup);
            }
        }
        MenuManager.initAdminMenu(plugin.getClassList(), adminMenuGroups);
        return adminMenuGroups;
    }
}
