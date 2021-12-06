package com.perfree.service;

import com.perfree.commons.Pager;
import com.perfree.model.Menu;
import com.perfree.permission.AdminMenuGroup;

import java.util.List;

/**
 * MenuService
 * @author Perfree
 */
public interface MenuService {

    /**
     * 根据用户id获取菜单列表
     * @param id id
     * @return List<Menu>
     */
    List<Menu> getMenuByUserIdAndType(Long id,int type);

    /**
     * 菜单列表分页
     * @param pager pager
     * @return Pager<Menu>
     */
    Pager<Menu> list(Pager<Menu> pager);

    /**
     * 添加菜单
     * @param menu 菜单
     * @return int
     */
    int add(Menu menu);

    /**
     * 根据id获取菜单信息
     * @param id id
     * @return Menu
     */
    Menu getById(String id);

    /**
     * 更新菜单
     * @param menu menu
     * @return int
     */
    int update(Menu menu);

    /**
     * 删除菜单
     * @param idArr idArr
     * @return int
     */
    int del(String[] idArr);

    /**
     * 更改状态
     * @param menu menu
     * @return int
     */
    int changeStatus(Menu menu);

    /**
     * 获取前台菜单
     * @return List<Menu>
     */
    List<Menu> getProtalMenus();

    /**
     * @description 根据url获取菜单
     * @param url  url
     * @return com.perfree.model.Menu
     */
    Menu getMenuByUrl(String url);

    /**
     * @description 初始化系统菜单
     * @author Perfree
     */
    void initSystemMenu(List<AdminMenuGroup> adminMenuGroups);

    /**
     * 添加插件菜单
     * @param adminMenuGroups adminMenuGroups
     */
    void addPluginSystemMenu(List<AdminMenuGroup> adminMenuGroups);

    /**
     * 移除插件菜单
     * @param adminMenuGroups adminMenuGroups
     */
    void removePluginSystemMenu(List<AdminMenuGroup> adminMenuGroups);
}
