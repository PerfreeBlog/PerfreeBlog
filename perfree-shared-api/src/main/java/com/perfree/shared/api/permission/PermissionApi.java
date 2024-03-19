package com.perfree.shared.api.permission;

public interface PermissionApi {

    /**
     * 判断是否拥有该角色
     * @param role role
     * @return boolean
     */
    boolean hasRole(String role);

    /**
     * 判断是否拥有任意一角色
     * @param roles roles
     * @return boolean
     */
    boolean hasRoles(String[] roles);

}
