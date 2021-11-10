package com.perfree.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Constants;
import com.perfree.common.OptionCacheUtil;
import com.perfree.common.Pager;
import com.perfree.commons.RegisterRequestMapping;
import com.perfree.controller.front.PageController;
import com.perfree.interceptor.BaseMenuService;
import com.perfree.mapper.MenuMapper;
import com.perfree.model.Menu;
import com.perfree.model.RoleMenu;
import com.perfree.permission.AdminMenuGroup;
import com.perfree.permission.MenuItem;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.util.ReflectionUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class MenuService implements BaseMenuService {
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
        menu.setCreateTime(new Date());
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
        for (String id : idArr) {
            Menu byId = menuMapper.getById(id);
            RegisterRequestMapping.unregisterRequestMapping(byId.getUrl());
        }
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

    public void delMenuArticleId(String[] idArr) {
        for (String id : idArr) {
            menuMapper.delMenuArticleId(id);
        }
    }

    public Menu getMenuByUrl(String url) {
        return menuMapper.getMenuByUrl(url);
    }

    /**
     * 注册所有的菜单url规则
     */
    public void registerMenuPage() {
        List<Menu> menus = menuMapper.getRegisterMenu();
        if (menus == null || menus.size() <= 0 ){
            return;
        }
        List<String> patterns = new ArrayList<>();
        List<String> patternsPageIndex = new ArrayList<>();
        String themePath = "static/themes/" + OptionCacheUtil.getValue(Constants.OPTION_WEB_THEME);
        menus.forEach(r -> {
            if (RegisterRequestMapping.isUrlPattern(r.getUrl()) && StringUtils.isNotBlank(r.getUrl())
                    && r.getUrl().startsWith("/") && !r.getUrl().equals("/")){
                patterns.add(r.getUrl());
                patternsPageIndex.add(RegisterRequestMapping.urlPageIndex(r.getUrl()));
            }
        });
        String[] patternArr = new String[patterns.size()];
        String[] patternPageIndexArr = new String[patternsPageIndex.size()];
        Method method_name = ReflectionUtils.findMethod(PageController.class, "pages", HttpServletRequest.class,
                HttpServletResponse.class, Model.class);
        RegisterRequestMapping.registerRequestMapping(PageController.class,method_name, patterns.toArray(patternArr));

        Method methodName = ReflectionUtils.findMethod(PageController.class, "pages", int.class,HttpServletRequest.class,
                HttpServletResponse.class, Model.class);
        RegisterRequestMapping.registerRequestMapping(PageController.class,methodName, patternsPageIndex.toArray(patternPageIndexArr));
    }

    /**
     * 根据url注册RequestMapping
     * @param url url
     */
    public void registerMenuPageByUrl(String url) {
        String themePath = "static/themes/" + OptionCacheUtil.getValue(Constants.OPTION_WEB_THEME);
        File file = new File(Constants.PROD_RESOURCES_PATH + Constants.SEPARATOR + themePath + url + ".html");
        File devFile = new File(Constants.DEV_RESOURCES_PATH + Constants.SEPARATOR + themePath + url + ".html");

        File pageFile = new File(Constants.PROD_RESOURCES_PATH + Constants.SEPARATOR +  themePath + "/page.html");
        File devPageFile = new File(Constants.DEV_RESOURCES_PATH + Constants.SEPARATOR + themePath + "/page.html");
        if (!file.exists() && !devFile.exists() && !pageFile.exists() && !devPageFile.exists()) {
            return;
        }
        String[] patternArr = {url};
        String[] patternPageIndexArr = {RegisterRequestMapping.urlPageIndex(url)};
        Method method_name = ReflectionUtils.findMethod(PageController.class, "pages", HttpServletRequest.class,
                HttpServletResponse.class, Model.class);
        RegisterRequestMapping.registerRequestMapping(PageController.class,method_name, patternArr);

        Method methodName = ReflectionUtils.findMethod(PageController.class, "pages", int.class,HttpServletRequest.class,
                HttpServletResponse.class, Model.class);
        RegisterRequestMapping.registerRequestMapping(PageController.class,methodName, patternPageIndexArr);
    }

    /**
     * @description 初始化系统菜单
     * @author Perfree
     */
    public void initSystemMenu(List<AdminMenuGroup> adminMenuGroups) {
        // 清除菜单
        menuMapper.deleteAllAdminMenu();
        // 清除后台权限
        menuMapper.deleteAllRoleMenu();
        // 初始化
        for (AdminMenuGroup adminMenuGroup : adminMenuGroups) {
            Menu menu = adminMenuGroupToMenu(adminMenuGroup, -1L,null);
            for (MenuItem menuItem : adminMenuGroup.getMenuItems()) {
                menuItemToMenu(menuItem, menu.getId(), null);
            }
        }
    }

    /**
     * 添加插件menu
     */
    public void addPluginSystemMenu(List<AdminMenuGroup> adminMenuGroups, String pluginId) {
        for (AdminMenuGroup adminMenuGroup : adminMenuGroups) {
            Menu menu = adminMenuGroupToMenu(adminMenuGroup, -1L,pluginId);
            for (MenuItem menuItem : adminMenuGroup.getMenuItems()) {
                menuItemToMenu(menuItem, menu.getId(), pluginId);
            }
        }
    }

    /**
     * 移除插件菜单
     */
    public void removePluginSystemMenu(String pluginId) {
        List<Menu> menus = menuMapper.getByPluginId(pluginId);
        for (Menu menu : menus) {
            menuMapper.delById(menu.getId());
            menuMapper.delRoleMenuByMenuId(menu.getId());
        }
    }

    public Menu adminMenuGroupToMenu(AdminMenuGroup adminMenuGroup, Long pid, String pluginId){
        Menu menu = new Menu();
        menu.setIcon(adminMenuGroup.getIcon());
        menu.setName(adminMenuGroup.getName());
        menu.setPid(pid);
        menu.setStatus(0);
        menu.setPluginId(pluginId);
        menu.setSeq(adminMenuGroup.getSeq());
        menu.setType(1);
        menu.setTarget(0);
        menu.setUrl(adminMenuGroup.getUrl());
        menu.setCreateTime(new Date());
        menuMapper.add(menu);
        initMenuRole(menu, adminMenuGroup.getRole());
        return menu;
    }

    public void menuItemToMenu(MenuItem menuItem, Long pid, String pluginId){
        Menu menu = new Menu();
        menu.setIcon(menuItem.getIcon());
        menu.setName(menuItem.getName());
        menu.setPid(pid);
        menu.setStatus(0);
        menu.setSeq(menuItem.getSeq());
        menu.setType(1);
        menu.setPluginId(pluginId);
        menu.setTarget(menuItem.getTarget());
        menu.setUrl(menuItem.getUrl());
        menu.setCreateTime(new Date());
        menuMapper.add(menu);
        initMenuRole(menu, menuItem.getRole());
    }

    /**
     * @description 初始化权限
     */
    public void initMenuRole(Menu menu, List<String> roleCodes) {
        for (String roleCode : roleCodes) {
            RoleMenu roleMenu = new RoleMenu();
            roleMenu.setMenuId(menu.getId());
            roleMenu.setRoleCode(roleCode);
            menuMapper.addRoleMenuByRoleCode(roleMenu);
        }
    }
}
