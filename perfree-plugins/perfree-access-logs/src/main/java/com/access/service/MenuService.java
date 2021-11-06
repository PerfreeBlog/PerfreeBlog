package com.access.service;

import com.access.mapper.MenuMapper;
import com.access.model.RoleMenu;
import com.perfree.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 菜单service
 */
@Service
public class MenuService {
    @Autowired
    private MenuMapper menuMapper;

    /**
     * 添加管理菜单
     * @param menu menu
     * @return Menu
     */
    public Menu addAdminMenu(Menu menu){
        menuMapper.addAdminMenu(menu);
        return menu;
    }

    /**
     * 移除管理菜单
     * @param menu menu
     */
    public void removeAdminMenu(Menu menu){
        menuMapper.removeRoleMenu(menu);
        menuMapper.removeAdminMenu(menu);
    }


    /**
     * 添加菜单权限
     * @param roleMenu roleMenu
     */
    public void addRoleMenu(RoleMenu roleMenu) {
        menuMapper.addRoleMenu(roleMenu);
    }

    /**
     * 根据url查询菜单
     * @param menu menu
     * @return Menu
     */
    public Menu queryByUrl(Menu menu) {
        return menuMapper.queryByUrl(menu);
    }
}
