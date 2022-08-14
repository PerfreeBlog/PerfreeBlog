package com.perfree.service.impl;

import cn.hutool.core.util.IdUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.commons.Constants;
import com.perfree.commons.Pager;
import com.perfree.mapper.MenuMapper;
import com.perfree.model.Menu;
import com.perfree.model.RoleMenu;
import com.perfree.permission.AdminMenuGroup;
import com.perfree.permission.MenuItem;
import com.perfree.permission.MenuManager;
import com.perfree.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class MenuServiceImpl implements MenuService {
    @Autowired
    private MenuMapper menuMapper;

    /**
     * 根据用户id获取菜单列表
     * @param id id
     * @return List<Menu>
     */
    @Transactional(readOnly = true)
    public List<Menu> getMenuByUserIdAndType(Long id,int type) {
        return menuMapper.getParentMenuByUserIdAndType(id, type);
    }

    /**
     * 菜单列表分页
     * @param pager pager
     * @return Pager<Menu>
     */
    @Transactional(readOnly = true)
    public Pager<Menu> list(Pager<Menu> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Menu> menus = menuMapper.getList(pager.getForm());
        PageInfo<Menu> pageInfo = new PageInfo<>(menus);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }

    /**
     * 添加菜单
     * @param menu 菜单
     * @return int
     */
    public int add(Menu menu) {
        menu.setId(IdUtil.simpleUUID());
        menu.setCreateTime(new Date());
        menu.setUpdateTime(new Date());
        return menuMapper.add(menu);
    }

    /**
     * 根据id获取菜单信息
     * @param id id
     * @return Menu
     */
    @Transactional(readOnly = true)
    public Menu getById(String id) {
        return menuMapper.getById(id);
    }

    /**
     * 更新菜单
     * @param menu menu
     * @return int
     */
    public int update(Menu menu) {
        menu.setUpdateTime(new Date());
        return menuMapper.update(menu);
    }

    /**
     * 删除菜单
     * @param idArr idArr
     * @return int
     */
    public int del(String[] idArr) {
        return menuMapper.del(idArr);
    }

    /**
     * 更改状态
     * @param menu menu
     * @return int
     */
    public int changeStatus(Menu menu) {
        menu.setUpdateTime(new Date());
        return menuMapper.changeStatus(menu);
    }

    /**
     * 获取前台菜单
     * @return List<Menu>
     */
    public List<Menu> getProtalMenus() {
        return menuMapper.getProtalMenus();
    }

    public Menu getMenuByUrl(String url) {
        return menuMapper.getMenuByUrl(url);
    }

    /**
     * @description 初始化系统菜单
     * @author Perfree
     */
    public void initSystemMenu(List<AdminMenuGroup> adminMenuGroups) {
        // 清除后台菜单及权限,重新生成
        List<Menu> menus  = menuMapper.getAllAdminMenu();
        for (Menu menu : menus) {
            menuMapper.delById(menu.getId());
            menuMapper.delRoleMenuByMenuId(menu.getId());
        }
        saveAdminGroups(adminMenuGroups);
    }

    /**
     * 存储生成的菜单
     * @param adminMenuGroups adminMenuGroups
     */
    private void saveAdminGroups(List<AdminMenuGroup> adminMenuGroups) {
        for (AdminMenuGroup adminMenuGroup : adminMenuGroups) {
            Menu parentMenu = menuMapper.getById(adminMenuGroup.getId());
            // 如果菜单组不存在与数据库,则新增
            if (parentMenu == null ) {
                parentMenu = generateMenu(adminMenuGroup, Constants.MENU_PARENT_DEFAULT_PID);
                initMenuRole(parentMenu, adminMenuGroup.getRole());
            }
            // 保存子菜单
            for (MenuItem menuItem : adminMenuGroup.getMenuItems()) {
                Menu childMenu = generateMenu(menuItem, parentMenu.getId());
                initMenuRole(childMenu, menuItem.getRole());
            }
        }
    }

    /**
     * 添加插件menu
     */
    public void addPluginSystemMenu(List<AdminMenuGroup> adminMenuGroups) {
        saveAdminGroups(adminMenuGroups);
        for (AdminMenuGroup adminMenuGroup : adminMenuGroups) {
            AdminMenuGroup adminMenuGroupByGroupId = MenuManager.getAdminMenuGroupByGroupId(adminMenuGroup.getGroupId());
            // 如果菜单组已存在,则将子菜单插入进已存在的组中
            if (adminMenuGroupByGroupId != null) {
                adminMenuGroupByGroupId.getMenuItems().addAll(adminMenuGroup.getMenuItems());
            } else {
                MenuManager.SYSTEM_MENU_LIST.add(adminMenuGroup);
            }
        }
    }

    /**
     * 移除插件菜单
     */
    public void removePluginSystemMenu(List<AdminMenuGroup> adminMenuGroups) {
        for (AdminMenuGroup adminMenuGroup : adminMenuGroups) {
            AdminMenuGroup adminMenuGroupByGroupId = MenuManager.getAdminMenuGroupByGroupId(adminMenuGroup.getGroupId());
            if (adminMenuGroupByGroupId == null) {
                continue;
            }

            List<MenuItem> collect = adminMenuGroup.getMenuItems().stream()
                    .map(t -> adminMenuGroupByGroupId.getMenuItems()
                            .stream()
                            .filter(s -> Objects.equals(t.getId(), s.getId()))
                            .findAny()
                            .orElse(null)).collect(Collectors.toList());
            for (MenuItem menuItem : collect) {
                menuMapper.delById(menuItem.getId());
                menuMapper.delRoleMenuByMenuId(menuItem.getId());
            }
            adminMenuGroupByGroupId.getMenuItems().removeAll(collect);
            // 如果菜单组内无其他菜单并且不属于系统菜单组,清除组
            if (adminMenuGroupByGroupId.getMenuItems().size() <= 0 &&
                    !MenuManager.isSystemDefaultAdminMenuGroup(adminMenuGroupByGroupId.getGroupId())) {
                menuMapper.delById(adminMenuGroupByGroupId.getId());
                menuMapper.delRoleMenuByMenuId(adminMenuGroupByGroupId.getId());
                MenuManager.SYSTEM_MENU_LIST.remove(adminMenuGroupByGroupId);
            }
        }
    }

    /**
     * 生成Menu实体
     * @param menu menu
     * @param pid pid
     * @return Menu
     */
    private Menu generateMenu(Menu menu, String pid){
        menu.setPid(pid);
        menu.setStatus(0);
        menu.setType(1);
        menu.setTarget(0);
        menu.setCreateTime(new Date());
        menuMapper.add(menu);
        return menu;
    }

    /**
     * @description 初始化权限
     */
    private void initMenuRole(Menu menu, List<String> roleCodes) {
        for (String roleCode : roleCodes) {
            RoleMenu roleMenu = new RoleMenu();
            roleMenu.setMenuId(menu.getId());
            roleMenu.setRoleCode(roleCode);
            menuMapper.addRoleMenuByRoleCode(roleMenu);
        }
    }
}
