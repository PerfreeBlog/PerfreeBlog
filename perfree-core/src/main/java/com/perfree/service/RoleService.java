package com.perfree.service;

import com.perfree.model.Role;

import java.util.List;

/**
 * @description RoleService
 * @author Perfree
 * @date 2021/11/15 10:24
 */
public interface RoleService {

    /**
     * 获取角色列表(不分页)
     * @return List<Role>
     */
    List<Role> getRoleList();

    /**
     * 根据角色代码获取角色
     * @param roleCode 角色代码
     * @return Role
     */
    Role getRoleByCode(String roleCode);

    int add(Role role);

}
