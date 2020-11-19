package com.perfree.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Pager;
import com.perfree.mapper.MenuMapper;
import com.perfree.model.Menu;
import com.perfree.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class MenuService {

    @Autowired
    private MenuMapper menuMapper;

    /**
     * 根据用户id获取菜单列表
     * @param id id
     * @return List<Menu>
     */
    @Transactional(readOnly = true)
    public List<Menu> getAdminMenuByUserId(Long id) {
        List<Menu> menus = menuMapper.getParentMenuByUserIdAndType(id, 1);
        for (Menu menu:menus) {
            List<Menu> childMenus = menuMapper.getChildMenuByUserIdAndType(id, menu.getId(), 1);
            menu.setChildMenu(childMenus);
        }
        return menus;
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
}
