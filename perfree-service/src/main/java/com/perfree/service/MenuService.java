package com.perfree.service;

import com.perfree.mapper.MenuMapper;
import com.perfree.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuMapper menuMapper;

    /**
     * 根据用户id获取菜单列表
     * @param id id
     * @return List<Menu>
     */
    public List<Menu> getAdminMenuByUserId(Long id) {
        List<Menu> menus = menuMapper.getParentMenuByUserIdAndType(id, 1);
        for (Menu menu:menus) {
            List<Menu> childMenus = menuMapper.getChildMenuByUserIdAndType(id, menu.getId(), 1);
            menu.setChildMenu(childMenus);
        }
        return menus;
    }
}
