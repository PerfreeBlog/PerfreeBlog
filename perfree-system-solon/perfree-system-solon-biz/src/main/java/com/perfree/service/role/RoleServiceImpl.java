package com.perfree.service.role;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.role.vo.RoleAddReqVO;
import com.perfree.controller.auth.role.vo.RoleMenuReqVO;
import com.perfree.controller.auth.role.vo.RolePageReqVO;
import com.perfree.controller.auth.role.vo.RoleUpdateReqVO;
import com.perfree.convert.role.RoleConvert;
import com.perfree.mapper.RoleMapper;
import com.perfree.mapper.RoleMenuMapper;
import com.perfree.model.Role;
import com.perfree.model.RoleMenu;
import jakarta.annotation.Resource;
import org.apache.ibatis.solon.annotation.Db;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.noear.solon.data.annotation.Transaction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Component
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {

    @Inject
    private RoleMapper roleMapper;

    @Inject
    private RoleMenuMapper roleMenuMapper;


    @Override
    public PageResult<Role> rolePage(RolePageReqVO pageVO) {
        return roleMapper.selectPage(pageVO);
    }

    @Override
    public List<RoleMenu> getRoleMenus(Integer id) {
        return roleMenuMapper.selectByRoleId(id);
    }

    @Override
    @Transaction
    public Boolean assignRoleMenu(RoleMenuReqVO roleMenuReqVO) {
        roleMenuMapper.deleteByRoleId(roleMenuReqVO.getRoleId());
        List<RoleMenu> roleMenuList = new ArrayList<>();
        for (String menuId : roleMenuReqVO.getMenuIds()) {
            RoleMenu roleMenu = new RoleMenu();
            roleMenu.setRoleId(roleMenuReqVO.getRoleId());
            roleMenu.setMenuId(menuId);
            roleMenuList.add(roleMenu);
        }
        roleMenuMapper.insertBatch(roleMenuList);
        return true;
    }

    @Override
    public Role get(Integer id) {
        return roleMapper.selectById(id);
    }

    @Override
    @Transaction
    public Role add(RoleAddReqVO roleAddReqVO) {
        Role role = RoleConvert.INSTANCE.convertAddReqVO(roleAddReqVO);
        roleMapper.insert(role);
        return role;
    }

    @Override
    @Transaction
    public Role update(RoleUpdateReqVO roleUpdateReqVO) {
        Role role = RoleConvert.INSTANCE.convertUpdateReqVO(roleUpdateReqVO);
        roleMapper.updateById(role);
        return role;
    }

    @Override
    @Transaction
    public Boolean del(Integer id) {
        roleMenuMapper.deleteByRoleId(id);
        roleMapper.deleteById(id);
        return true;
    }

    @Override
    public List<Role> getByUserId(Integer userId) {
        return roleMapper.getByUserId(userId);
    }
}
