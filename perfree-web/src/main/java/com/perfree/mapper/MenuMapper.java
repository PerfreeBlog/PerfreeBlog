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

    List<Menu> getProtalMenus();

    List<Menu> getProtalChildMenus();

    /**
     * 根据用户id,菜单类型,父级id获取子菜单
     * @param userId 用户id
     * @param id 菜单父级id
     * @param type 类型
     * @return List<Menu>
     */
    List<Menu> getChildMenuByUserIdAndType(@Param("userId") Long userId, @Param("id") Long id, @Param("type") Integer type);

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

    /**
     * 根据id获取菜单信息
     * @param id id
     * @return Menu
     */
    Menu getById(String id);

    /**
     * 更新菜单
     * @param menu menu
     * @return int
     */
    int update(Menu menu);

    /**
     * 删除菜单
     * @param idArr idArr
     * @return int
     */
    int del(String[] idArr);

    /**
     * 更改状态
     * @param menu menu
     * @return int
     */
    int changeStatus(Menu menu);
}
