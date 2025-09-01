package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.menu.vo.MenuListReqVO;
import com.perfree.model.Menu;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
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
public interface MenuMapper extends BaseMapperX<Menu> {

    /**
     * 根据用户id和菜单类型获取菜单
     * @param userId 用户id
     * @return List<Menu>
     */
    List<Menu> menuListByUserIdAndType(@Param("userId") Integer userId, @Param("type") Integer type);

    /**
     * 菜单列表
     * @param pageVO pageVO
     * @return List<Menu>
     */
    default List<Menu> menuList(MenuListReqVO pageVO){
        QueryWrapper queryWrapper = QueryWrapper.create();
        if (StringUtils.isNotBlank(pageVO.getName())) {
            queryWrapper.like(Menu::getName, pageVO.getName());
        }
        queryWrapper.eq(Menu::getType, pageVO.getType());
        queryWrapper.orderBy(Menu::getSeq);
        return selectListByQuery(queryWrapper);
    }

    /**
     * 根据父级id获取信息
     * @param id id
     * @return List<Menu
     */
    default List<Menu> getByParentId(String id){
        return selectListByQuery(new QueryWrapper()
                .eq(Menu::getPid, id));
    }

    /**
     * 根据用户id获取权限
     * @param userId 用户id
     * @return List<String>
     */
    List<String> getPermissionByUserId(@Param("userId") Integer userId, @Param("menuType") Integer menuType);


    /**
     * 获取管理员菜单
     * @return List<Menu>
     */
    List<Menu> menuListByType(@Param("type") Integer type);

    default void deleteMenuByPluginId(String pluginId){
        deleteByQuery(new QueryWrapper().eq(Menu::getPluginId, pluginId));
    }

}
