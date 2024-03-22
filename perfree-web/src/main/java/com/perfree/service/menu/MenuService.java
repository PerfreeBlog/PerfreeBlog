package com.perfree.service.menu;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.controller.api.menu.vo.MenuListReqVO;
import com.perfree.model.Menu;
import com.perfree.controller.api.menu.vo.MenuTreeRespVO;

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
}
