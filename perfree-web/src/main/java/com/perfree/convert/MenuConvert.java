package com.perfree.convert;

import com.perfree.controller.api.menu.vo.MenuCreateReqVO;
import com.perfree.controller.api.menu.vo.MenuRespVO;
import com.perfree.controller.api.menu.vo.MenuUpdateReqVO;
import com.perfree.model.Menu;
import com.perfree.controller.api.menu.vo.MenuTreeRespVO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MenuConvert {
    MenuConvert INSTANCE = Mappers.getMapper(MenuConvert.class);

    List<MenuTreeRespVO> convertToMenuTreeRespVOList(List<Menu> menuList);

    List<MenuRespVO> convertListRespVO(List<Menu> menuList);

    Menu convertByCreateVO(MenuCreateReqVO menuCreateReqVO);

    MenuRespVO convertRespVO(Menu menu);

    Menu convertByUpdateVO(MenuUpdateReqVO menuUpdateReqVO);

}
