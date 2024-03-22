package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.controller.api.menu.vo.MenuListReqVO;
import com.perfree.model.Menu;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MenuMapper extends BaseMapperX<Menu>{

    List<Menu> getMenuByUserIdAndType(@Param("userId") Long userId, @Param("type") int type);

    default List<Menu> menuList(MenuListReqVO menuListReqVO){
        return selectList(new LambdaQueryWrapper<Menu>()
                .like(StringUtils.isNotBlank(menuListReqVO.getName()), Menu::getName, menuListReqVO.getName())
                .eq(null != menuListReqVO.getType(), Menu::getType, menuListReqVO.getType())
                .eq(null != menuListReqVO.getSiteId(), Menu::getSiteId, menuListReqVO.getSiteId())
                .orderByAsc(Menu::getSeq));
    }

}
