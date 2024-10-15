package com.perfree.convert.menu;

import com.perfree.controller.auth.menu.vo.MenuAddOrUpdateReqVO;
import com.perfree.controller.auth.menu.vo.MenuRespVO;
import com.perfree.controller.auth.system.vo.MenuTreeListRespVO;
import com.perfree.model.Menu;
import com.perfree.system.api.menu.dto.MenuDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:59+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class MenuConvertImpl implements MenuConvert {

    @Override
    public List<MenuTreeListRespVO> convertTreeList(List<Menu> menuList) {
        if ( menuList == null ) {
            return null;
        }

        List<MenuTreeListRespVO> list = new ArrayList<MenuTreeListRespVO>( menuList.size() );
        for ( Menu menu : menuList ) {
            list.add( menuToMenuTreeListRespVO( menu ) );
        }

        return list;
    }

    @Override
    public List<MenuRespVO> convertListVO(List<Menu> menuList) {
        if ( menuList == null ) {
            return null;
        }

        List<MenuRespVO> list = new ArrayList<MenuRespVO>( menuList.size() );
        for ( Menu menu : menuList ) {
            list.add( convertRespVO( menu ) );
        }

        return list;
    }

    @Override
    public MenuRespVO convertRespVO(Menu menu) {
        if ( menu == null ) {
            return null;
        }

        MenuRespVO menuRespVO = new MenuRespVO();

        menuRespVO.setName( menu.getName() );
        menuRespVO.setUrl( menu.getUrl() );
        menuRespVO.setIcon( menu.getIcon() );
        menuRespVO.setSeq( menu.getSeq() );
        menuRespVO.setTarget( menu.getTarget() );
        menuRespVO.setStatus( menu.getStatus() );
        menuRespVO.setPluginId( menu.getPluginId() );
        menuRespVO.setFlag( menu.getFlag() );
        menuRespVO.setComponent( menu.getComponent() );
        menuRespVO.setComponentName( menu.getComponentName() );
        menuRespVO.setModuleName( menu.getModuleName() );
        menuRespVO.setMenuType( menu.getMenuType() );
        menuRespVO.setPerms( menu.getPerms() );
        menuRespVO.setIsFrame( menu.getIsFrame() );
        menuRespVO.setType( menu.getType() );
        menuRespVO.setId( menu.getId() );
        menuRespVO.setPid( menu.getPid() );
        menuRespVO.setCreateTime( menu.getCreateTime() );

        return menuRespVO;
    }

    @Override
    public Menu convertMenu(MenuAddOrUpdateReqVO menuAddOrUpdateReqVO) {
        if ( menuAddOrUpdateReqVO == null ) {
            return null;
        }

        Menu menu = new Menu();

        menu.setId( menuAddOrUpdateReqVO.getId() );
        menu.setPid( menuAddOrUpdateReqVO.getPid() );
        menu.setName( menuAddOrUpdateReqVO.getName() );
        menu.setUrl( menuAddOrUpdateReqVO.getUrl() );
        menu.setIcon( menuAddOrUpdateReqVO.getIcon() );
        menu.setSeq( menuAddOrUpdateReqVO.getSeq() );
        menu.setTarget( menuAddOrUpdateReqVO.getTarget() );
        menu.setStatus( menuAddOrUpdateReqVO.getStatus() );
        menu.setPluginId( menuAddOrUpdateReqVO.getPluginId() );
        menu.setFlag( menuAddOrUpdateReqVO.getFlag() );
        menu.setComponent( menuAddOrUpdateReqVO.getComponent() );
        menu.setComponentName( menuAddOrUpdateReqVO.getComponentName() );
        menu.setModuleName( menuAddOrUpdateReqVO.getModuleName() );
        menu.setMenuType( menuAddOrUpdateReqVO.getMenuType() );
        menu.setPerms( menuAddOrUpdateReqVO.getPerms() );
        menu.setIsFrame( menuAddOrUpdateReqVO.getIsFrame() );
        menu.setType( menuAddOrUpdateReqVO.getType() );

        return menu;
    }

    @Override
    public Menu convertByDTO(MenuDTO menuDTO) {
        if ( menuDTO == null ) {
            return null;
        }

        Menu menu = new Menu();

        menu.setId( menuDTO.getId() );
        menu.setPid( menuDTO.getPid() );
        menu.setName( menuDTO.getName() );
        menu.setUrl( menuDTO.getUrl() );
        menu.setIcon( menuDTO.getIcon() );
        menu.setSeq( menuDTO.getSeq() );
        menu.setTarget( menuDTO.getTarget() );
        menu.setStatus( menuDTO.getStatus() );
        menu.setPluginId( menuDTO.getPluginId() );
        menu.setComponent( menuDTO.getComponent() );
        menu.setComponentName( menuDTO.getComponentName() );
        menu.setModuleName( menuDTO.getModuleName() );
        menu.setMenuType( menuDTO.getMenuType() );
        menu.setPerms( menuDTO.getPerms() );
        menu.setIsFrame( menuDTO.getIsFrame() );

        return menu;
    }

    @Override
    public MenuDTO convertToDTO(Menu menu) {
        if ( menu == null ) {
            return null;
        }

        MenuDTO.MenuDTOBuilder menuDTO = MenuDTO.builder();

        menuDTO.id( menu.getId() );
        menuDTO.pid( menu.getPid() );
        menuDTO.name( menu.getName() );
        menuDTO.url( menu.getUrl() );
        menuDTO.icon( menu.getIcon() );
        menuDTO.seq( menu.getSeq() );
        menuDTO.target( menu.getTarget() );
        menuDTO.status( menu.getStatus() );
        menuDTO.pluginId( menu.getPluginId() );
        menuDTO.component( menu.getComponent() );
        menuDTO.componentName( menu.getComponentName() );
        menuDTO.moduleName( menu.getModuleName() );
        menuDTO.menuType( menu.getMenuType() );
        menuDTO.perms( menu.getPerms() );
        menuDTO.isFrame( menu.getIsFrame() );

        return menuDTO.build();
    }

    protected MenuTreeListRespVO menuToMenuTreeListRespVO(Menu menu) {
        if ( menu == null ) {
            return null;
        }

        MenuTreeListRespVO menuTreeListRespVO = new MenuTreeListRespVO();

        menuTreeListRespVO.setName( menu.getName() );
        menuTreeListRespVO.setUrl( menu.getUrl() );
        menuTreeListRespVO.setIcon( menu.getIcon() );
        menuTreeListRespVO.setSeq( menu.getSeq() );
        menuTreeListRespVO.setTarget( menu.getTarget() );
        menuTreeListRespVO.setStatus( menu.getStatus() );
        menuTreeListRespVO.setPluginId( menu.getPluginId() );
        menuTreeListRespVO.setFlag( menu.getFlag() );
        menuTreeListRespVO.setComponent( menu.getComponent() );
        menuTreeListRespVO.setComponentName( menu.getComponentName() );
        menuTreeListRespVO.setModuleName( menu.getModuleName() );
        menuTreeListRespVO.setMenuType( menu.getMenuType() );
        menuTreeListRespVO.setPerms( menu.getPerms() );
        menuTreeListRespVO.setIsFrame( menu.getIsFrame() );
        menuTreeListRespVO.setType( menu.getType() );
        menuTreeListRespVO.setId( menu.getId() );
        menuTreeListRespVO.setPid( menu.getPid() );

        return menuTreeListRespVO;
    }
}
