package com.perfree.convert.menu;

import com.perfree.model.Menu;
import com.perfree.controller.auth.menu.vo.MenuAddOrUpdateReqVO;
import com.perfree.controller.auth.menu.vo.MenuRespVO;
import com.perfree.controller.auth.system.vo.MenuTreeListRespVO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MenuConvert {
    MenuConvert INSTANCE = Mappers.getMapper(MenuConvert.class);

    List<MenuTreeListRespVO> convertTreeList(List<Menu> menuList);

    List<MenuRespVO> convertListVO(List<Menu> menuList);

    MenuRespVO convertRespVO(Menu menu);

    Menu convertMenu(MenuAddOrUpdateReqVO menuAddOrUpdateReqVO);

}