package com.perfree.service;

import com.perfree.mapper.RoleMapper;
import com.perfree.mapper.TagMapper;
import com.perfree.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RoleService {
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
}
