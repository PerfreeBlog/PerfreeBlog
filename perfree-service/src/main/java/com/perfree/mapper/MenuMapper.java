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

    /**
     * 菜单列表分页
     * @param menu menu
     * @return Pager<Menu>
     */
    List<Menu> getList(Menu menu);

    List<Menu> getChildMenuList(Long id);

    /**
     * 添加菜单
     * @param menu 菜单
     * @return int
     */
    int add(Menu menu);
}
