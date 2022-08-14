package com.perfree.mapper;

import com.perfree.model.Role;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface RoleMapper {
    /**
     * 获取角色列表
     * @param role 角色
     * @return List<Role>
     */
    List<Role> list(Role role);

    Role getRoleByCode(String roleCode);

    int add(Role role);

}
