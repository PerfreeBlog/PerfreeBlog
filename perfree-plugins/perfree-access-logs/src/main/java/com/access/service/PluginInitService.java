package com.access.service;

import com.access.model.RoleMenu;
import com.perfree.model.Menu;
import com.perfree.plugins.Plugin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * 插件事件
 * 启动,更新,卸载,安装示例
 */
@Service
public class PluginInitService implements Plugin {
    @Autowired
    private AccessLogsService accessLogsService;
    @Autowired
    private MenuService menuService;

    @Override
    public void onStart() {
        System.out.println("onStart");
    }

    @Override
    public void onUpdate() {
        System.out.println("onUpdate");
    }

    @Override
    public void onInstall() {
        // 建表
        accessLogsService.dropTable();
        accessLogsService.createTable();
        // 创建菜单
        Menu menu = new Menu();
        menu.setIcon("fa-line-chart");
        menu.setName("访问统计");
        menu.setStatus(0);
        menu.setSeq(6);
        menu.setPid(-1L);
        menu.setTarget(0);
        menu.setUrl("/plugin/access");
        menu.setType(Menu.TYPE_AFTER);
        menu.setCreateTime(new Date());
        menu = menuService.addAdminMenu(menu);

        // 设置权限
        RoleMenu roleMenu = new RoleMenu();
        roleMenu.setMenuId(menu.getId());
        roleMenu.setRoleId(1L);
        menuService.addRoleMenu(roleMenu);
    }

    @Override
    public void onUnInstall() {
        // 删表
        accessLogsService.dropTable();
        // 删菜单
        Menu menu = new Menu();
        menu.setUrl("/plugin/access");
        menu = menuService.queryByUrl(menu);
        menuService.removeAdminMenu(menu);
    }
}
