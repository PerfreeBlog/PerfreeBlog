package com.perfree.service.menu;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.constants.SystemConstants;
import com.perfree.controller.api.menu.vo.*;
import com.perfree.convert.MenuConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.exception.ServiceException;
import com.perfree.mapper.MenuMapper;
import com.perfree.model.Menu;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements MenuService {

    @Resource
    private MenuMapper menuMapper;

    @Override
    public List<MenuTreeRespVO> getMenuByUserIdAndType(Long userId, int type) {
        List<Menu> menuList = menuMapper.getMenuByUserIdAndType(userId, type);
        List<MenuTreeRespVO> menuTreeListRespVOS = MenuConvert.INSTANCE.convertToMenuTreeRespVOList(menuList);
        // 获取所有跟节点
        List<MenuTreeRespVO> result = menuTreeListRespVOS.stream().filter(menu -> menu.getPid().equals(SystemConstants.ROOT_MENU_CODE)).toList();
        // 将原数组中所有根节点移除
        menuTreeListRespVOS.removeIf(menu -> menu.getPid().equals(SystemConstants.ROOT_MENU_CODE));
        for (MenuTreeRespVO menu : result) {
            buildChildMenu(menu, menuTreeListRespVOS);
        }
        return result;
    }

    @Override
    public List<Menu> menuList(MenuListReqVO menuListReqVO) {
        return menuMapper.menuList(menuListReqVO);
    }

    @Override
    @Transactional
    public Menu createMenu(MenuCreateReqVO menuCreateReqVO) {
        Menu menu = MenuConvert.INSTANCE.convertByCreateVO(menuCreateReqVO);
        verifyMenu(menu);
        menuMapper.insert(menu);
        return menu;
    }

    @Override
    @Transactional
    public Menu updateMenu(MenuUpdateReqVO menuUpdateReqVO) {
        Menu menu = MenuConvert.INSTANCE.convertByUpdateVO(menuUpdateReqVO);
        verifyMenu(menu);
        menuMapper.updateById(menu);
        return menu;
    }

    @Override
    @Transactional
    public Boolean delMenu(String id) {
        List<Menu> menu = menuMapper.selectByPid(id);
        if (!menu.isEmpty()) {
            throw new ServiceException(ErrorCode.MENU_EXIST_CHILD);
        }
        menuMapper.deleteById(id);
        return true;
    }

    /**
     * 验证菜单参数
     *
     * @param menu menu
     */
    private void verifyMenu(Menu menu) {
        if (StringUtils.isBlank(menu.getPid())) {
            menu.setPid(SystemConstants.ROOT_MENU_CODE);
        }
        if (StringUtils.isNotBlank(menu.getPid()) && !menu.getPid().equals(SystemConstants.ROOT_MENU_CODE) && !menu.getType().equals(SystemConstants.MENU_TYPE_ADMIN)) {
            Menu parent = menuMapper.selectById(menu.getPid());
            menu.setSiteId(parent.getSiteId());
        }
        if (!menu.getType().equals(SystemConstants.MENU_TYPE_ADMIN) && null == menu.getSiteId()) {
            throw new ServiceException(ErrorCode.MENU_MUST_SITE);
        }
    }

    /**
     * 生成子菜单
     *
     * @param menuTreeListRespVO 父级菜单信息
     * @param queryMenuTreeList  菜单集合
     */
    private void buildChildMenu(MenuTreeRespVO menuTreeListRespVO, List<MenuTreeRespVO> queryMenuTreeList) {
        List<MenuTreeRespVO> children = new ArrayList<>();
        for (MenuTreeRespVO treeListRespVO : queryMenuTreeList) {
            if (treeListRespVO.getPid().equals(menuTreeListRespVO.getId())) {
                children.add(treeListRespVO);
                buildChildMenu(treeListRespVO, queryMenuTreeList);
            }
        }
        menuTreeListRespVO.setChildMenu(children);
    }
}
