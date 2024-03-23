package com.perfree.service.menu;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.controller.api.menu.vo.*;
import com.perfree.model.Menu;

import java.util.List;

/**
 * @description MenuService
 * @author Perfree
 * @date 2021/11/15 10:23
 */
public interface MenuService extends IService<Menu> {

    /**
     * 根据用户id和类型获取菜单
     * @param userId userId
     * @param type type
     * @return List<MenuTreeRespVO>
     */
    List<MenuTreeRespVO> getMenuByUserIdAndType(Long userId, int type);

    /**
     * 获取菜单列表
     * @param menuListReqVO menuListReqVO
     * @return List<Menu>
     */
    List<Menu> menuList(MenuListReqVO menuListReqVO);

    /**
     * 添加菜单
     * @param menuCreateReqVO menuCreateReqVO
     * @return Menu
     */
    Menu createMenu(MenuCreateReqVO menuCreateReqVO);

    /**
     * 更新菜单
     * @param menuUpdateReqVO menuUpdateReqVO
     * @return Menu
     */
    Menu updateMenu(MenuUpdateReqVO menuUpdateReqVO);

    /**
     * 删除菜单
     * @param id id
     * @return Boolean
     */
    Boolean delMenu(String id);

}
