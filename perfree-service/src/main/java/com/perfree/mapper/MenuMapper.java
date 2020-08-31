package com.perfree.mapper;

import com.perfree.model.Menu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface MenuMapper {

    /**
     * 根据用户id和菜单类型获取父级菜单
     * @param id userId
     * @param type 类型
     * @return List<Menu>
     */
    List<Menu> getParentMenuByUserIdAndType(@Param("id") Long id, @Param("type") Integer type);

    /**
     * 根据用户id,菜单类型,父级id获取子菜单
     * @param id 用户id
     * @param pid 菜单父级id
     * @param type 类型
     * @return List<Menu>
     */
    List<Menu> getChildMenuByUserIdAndType(@Param("id") Long id, @Param("pid") Long pid, @Param("type") Integer type);

}
