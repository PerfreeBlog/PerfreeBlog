package com.perfree.service.menu;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.constants.SystemConstants;
import com.perfree.convert.MenuConvert;
import com.perfree.mapper.MenuMapper;
import com.perfree.model.Menu;
import com.perfree.controller.api.menu.vo.MenuTreeRespVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu>  implements MenuService {

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

    /**
     * 生成子菜单
     * @param menuTreeListRespVO 父级菜单信息
     * @param queryMenuTreeList 菜单集合
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
