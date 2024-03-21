package com.perfree.convert;

import com.perfree.model.Menu;
import com.perfree.controller.api.menu.vo.MenuTreeRespVO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MenuConvert {
    MenuConvert INSTANCE = Mappers.getMapper(MenuConvert.class);

    List<MenuTreeRespVO> convertToMenuTreeRespVOList(List<Menu> menuList);

}
