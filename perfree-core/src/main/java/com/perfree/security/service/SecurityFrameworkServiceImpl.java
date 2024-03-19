package com.perfree.security.service;


import com.perfree.shared.api.permission.PermissionApi;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SecurityFrameworkServiceImpl implements SecurityFrameworkService{

    private final PermissionApi permissionApi;

    @Override
    public boolean hasRole(String role) {
        return permissionApi.hasRole(role);
    }

    @Override
    public boolean hasRoles(String... roles) {
        return permissionApi.hasRoles(roles);
    }
}
