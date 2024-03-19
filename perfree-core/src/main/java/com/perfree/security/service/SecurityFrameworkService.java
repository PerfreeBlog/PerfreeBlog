package com.perfree.security.service;

public interface SecurityFrameworkService {


    /**
     * 判断是否有角色
     *
     * @param role 角色
     * @return 是否
     */
    boolean hasRole(String role);

    /**
     * 判断是否有角色，任一一个即可
     *
     * @param roles 角色
     * @return 是否
     */
    boolean hasRoles(String... roles);
}
