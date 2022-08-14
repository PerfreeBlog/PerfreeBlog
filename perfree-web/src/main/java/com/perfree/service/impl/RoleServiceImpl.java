package com.perfree.service.impl;

import com.perfree.mapper.RoleMapper;
import com.perfree.mapper.TagMapper;
import com.perfree.model.Role;
import com.perfree.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleMapper roleMapper;

    /**
     * 获取角色列表(不分页)
     * @return List<Role>
     */
    @Transactional(readOnly = true)
    public List<Role> getRoleList() {
        return roleMapper.list(null);
    }

    /**
     * 根据角色代码获取角色
     * @param roleCode 角色代码
     * @return Role
     */
    @Transactional(readOnly = true)
    public Role getRoleByCode(String roleCode) {
        return roleMapper.getRoleByCode(roleCode);
    }

    @Override
    public int add(Role role) {
        role.setCreateTime(new Date());
        role.setUpdateTime(new Date());
        return roleMapper.add(role);
    }
}
