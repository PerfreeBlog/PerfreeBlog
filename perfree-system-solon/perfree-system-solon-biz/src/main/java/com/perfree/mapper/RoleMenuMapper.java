package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.RoleMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.solon.annotation.Db;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface RoleMenuMapper extends BaseMapperX<RoleMenu> {

    /**
     * 根据菜单id删除数据
     * @param menuId menuId
     */
    default void deleteByMenuId(String menuId){
        deleteByQuery(new QueryWrapper().eq(RoleMenu::getMenuId, menuId));
    }

    /**
     * 根据角色id获取拥有的菜单列表
     * @param roleId roleId
     * @return List<RoleMenu>
     */
    default List<RoleMenu> selectByRoleId(Integer roleId){
        return selectListByQuery(new QueryWrapper().eq(RoleMenu::getRoleId, roleId));
    }

    /**
     * 根据角色id删除数据
     * @param roleId roleId
     */
    default void deleteByRoleId(Integer roleId){
        deleteByQuery(new QueryWrapper().eq(RoleMenu::getRoleId, roleId));
    }
}
