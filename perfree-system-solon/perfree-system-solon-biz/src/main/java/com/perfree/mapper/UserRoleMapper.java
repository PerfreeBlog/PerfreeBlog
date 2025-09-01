package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.UserRole;
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
public interface UserRoleMapper extends BaseMapperX<UserRole> {


    default void deleteByUserId(Integer userId){
        deleteByQuery(new QueryWrapper().eq(UserRole::getUserId, userId));
    }

    default List<UserRole> getByUserId(Integer userId){
        return selectListByQuery(new QueryWrapper().eq(UserRole::getUserId, userId));
    }

}
