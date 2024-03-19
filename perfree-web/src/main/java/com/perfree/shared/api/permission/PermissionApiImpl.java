package com.perfree.shared.api.permission;

import org.springframework.stereotype.Service;

@Service
public class PermissionApiImpl implements PermissionApi{

    @Override
    public boolean hasRole(String role) {
        return false;
    }

    @Override
    public boolean hasRoles(String[] roles) {
        return false;
    }
}
