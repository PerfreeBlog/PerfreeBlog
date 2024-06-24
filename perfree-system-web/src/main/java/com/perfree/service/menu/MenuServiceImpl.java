package com.perfree.service.menu;

import cn.hutool.core.util.IdUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.enums.MenuTypeEnum;
import com.perfree.commons.exception.ServiceException;
import com.perfree.controller.auth.menu.vo.MenuAddOrUpdateReqVO;
import com.perfree.controller.auth.menu.vo.MenuListReqVO;
import com.perfree.controller.auth.system.vo.MenuTreeListRespVO;
import com.perfree.convert.menu.MenuConvert;
import com.perfree.enums.MenuEnum;
import com.perfree.enums.RoleEnum;
import com.perfree.mapper.MenuMapper;
import com.perfree.mapper.RoleMenuMapper;
import com.perfree.model.Menu;
import com.perfree.model.Role;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.service.role.RoleService;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.enums.ErrorCode.MENU_EXISTS_CHILDREN;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements MenuService {

    @Resource
    private MenuMapper menuMapper;

    @Resource
    private RoleMenuMapper roleMenuMapper;

    @Resource
    private RoleService roleService;

    @Override
    public List<MenuTreeListRespVO> menuAdminListByLoginUser() {
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        assert loginUser != null;
        List<Role> roles = roleService.getByUserId(loginUser.getId());
        boolean isAdmin = false;
        for (Role role : roles) {
            if (role.getCode().equals(RoleEnum.ADMIN_CODE.getCode())) {
                isAdmin = true;
                break;
            }
        }
        List<Menu> menuList;
        if (isAdmin) {
            menuList = menuMapper.menuListByAdmin(MenuTypeEnum.ADMIN.getType());
        } else {
            menuList = menuMapper.menuListByUserId(loginUser.getId(), MenuTypeEnum.ADMIN.getType());
        }
        return handleMenuTree(menuList);
    }

    @Override
    public List<Menu> menuList(MenuListReqVO pageVO) {
        return menuMapper.menuList(pageVO);
    }

    @Override
    @Transactional
    public Menu addOrUpdate(MenuAddOrUpdateReqVO menuAddOrUpdateReqVO) {
        Menu menu = MenuConvert.INSTANCE.convertMenu(menuAddOrUpdateReqVO);
        if (StringUtils.isNotBlank(menu.getId())) {
            menuMapper.updateById(menu);
        } else {
            menu.setId(IdUtil.simpleUUID());
            menuMapper.insert(menu);
        }
        return menu;
    }

    @Override
    @Transactional
    public Boolean del(String id) {
        List<Menu> menuList = menuMapper.getByParentId(id);
        if (!menuList.isEmpty()) {
            throw new ServiceException(MENU_EXISTS_CHILDREN);
        }
        menuMapper.deleteById(id);
        roleMenuMapper.deleteByMenuId(id);
        return true;
    }

    @Override
    public List<String> getPermissionByUserId(Integer userId) {
        return menuMapper.getPermissionByUserId(userId, MenuEnum.MENU_TYPE_PERMISSION.getCode());
    }

    @Override
    public List<MenuTreeListRespVO> menuFrontList() {
        List<Menu> menuList = menuMapper.menuListByAdmin(MenuTypeEnum.FRONT.getType());
        return handleMenuTree(menuList);
    }

    /**
     * 处理菜单树
     * @param menuList menuList
     * @return List<MenuTreeListRespVO>
     */
    private List<MenuTreeListRespVO> handleMenuTree(List<Menu> menuList) {
        List<MenuTreeListRespVO> menuTreeListRespVOS = MenuConvert.INSTANCE.convertTreeList(menuList);
        // 获取所有跟节点
        List<MenuTreeListRespVO> result = menuTreeListRespVOS.stream().filter(menu -> menu.getPid().equals(SystemConstants.ROOT_MENU_CODE)).toList();
        // 将原数组中所有根节点移除
        menuTreeListRespVOS.removeIf(menu -> menu.getPid().equals(SystemConstants.ROOT_MENU_CODE));
        for (MenuTreeListRespVO menu : result) {
            buildChildMenu(menu, menuTreeListRespVOS);
        }
        return result;
    }

    /**
     * 生成子菜单
     *
     * @param menuTreeListRespVO 父级菜单信息
     * @param queryMenuTreeList  菜单集合
     */
    private void buildChildMenu(MenuTreeListRespVO menuTreeListRespVO, List<MenuTreeListRespVO> queryMenuTreeList) {
        List<MenuTreeListRespVO> children = new ArrayList<>();
        for (MenuTreeListRespVO treeListRespVO : queryMenuTreeList) {
            if (treeListRespVO.getPid().equals(menuTreeListRespVO.getId())) {
                children.add(treeListRespVO);
                buildChildMenu(treeListRespVO, queryMenuTreeList);
            }
        }
        menuTreeListRespVO.setChildren(children);
    }
}
