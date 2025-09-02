package com.perfree.security.service;

import cn.dev33.satoken.stp.StpUtil;
import com.perfree.system.api.permission.PermissionApi;
import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;

@Component("ss")
public class SecurityFrameworkServiceImpl implements SecurityFrameworkService{

    @Inject
    private PermissionApi permissionApi;

    @Override
    public boolean hasPermission(String permission) {
        // 检查是否登录
        if (!StpUtil.isLogin()) {
            return false;
        }
        return permissionApi.hasPermissions(permission);
    }

    @Override
    public boolean hasAnyPermissions(String... permissions) {
        // 检查是否登录
        if (!StpUtil.isLogin()) {
            return false;
        }
        return permissionApi.hasPermissions(permissions);
    }

    @Override
    public boolean hasRole(String roleCode) {
        // 检查是否登录
        if (!StpUtil.isLogin()) {
            return false;
        }
        return permissionApi.hasAnyRole(roleCode);
    }

    @Override
    public boolean hasAnyRole(String... roleCodes) {
        // 检查是否登录
        if (!StpUtil.isLogin()) {
            return false;
        }
        return permissionApi.hasAnyRole(roleCodes);
    }
}
