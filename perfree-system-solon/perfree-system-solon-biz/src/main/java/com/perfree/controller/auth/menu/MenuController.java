package com.perfree.controller.auth.menu;


import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.menu.vo.MenuAddOrUpdateReqVO;
import com.perfree.controller.auth.menu.vo.MenuListReqVO;
import com.perfree.controller.auth.menu.vo.MenuRespVO;
import com.perfree.convert.menu.MenuConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.Menu;
import com.perfree.service.menu.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.noear.solon.annotation.Mapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
 * @description 菜单
 * @author Perfree
 * @version 1.0.0
 * @create 2023/1/15 10:16
 **/
@Controller
@Tag(name = "菜单相关接口")
@Mapping("api/auth/menu")
public class MenuController {

    @Inject
    private MenuService menuService;

    @Post
    @Mapping("/page")
    @Operation(summary = "菜单页面列表")
    @PreAuthorize("@ss.hasPermission('admin:menu:query')")
    public CommonResult<List<MenuRespVO>> page(@Body MenuListReqVO pageVO) {
        List<Menu> menuList = menuService.menuList(pageVO);
        return success(MenuConvert.INSTANCE.convertListVO(menuList));
    }

    @Post
    @Mapping("/list")
    @Operation(summary = "菜单列表")
    public CommonResult<List<MenuRespVO>> list(@Body MenuListReqVO pageVO) {
        List<Menu> menuList = menuService.menuList(pageVO);
        return success(MenuConvert.INSTANCE.convertListVO(menuList));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "获取菜单")
    public CommonResult<MenuRespVO> get(@Param(value = "id") String id) {
        Menu menu = menuService.getById(id);
        return success(MenuConvert.INSTANCE.convertRespVO(menu));
    }

    @Post
    @Mapping("/add")
    @Operation(summary = "添加菜单")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:menu:create')")
    public CommonResult<MenuRespVO> add(@Body @Valid MenuAddOrUpdateReqVO menuAddOrUpdateReqVO) {
        Menu menu = menuService.addOrUpdate(menuAddOrUpdateReqVO);
        return success(MenuConvert.INSTANCE.convertRespVO(menu));
    }

    @Post
    @Mapping("/update")
    @Operation(summary = "更新菜单")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:menu:update')")
    public CommonResult<MenuRespVO> update(@Body @Valid MenuAddOrUpdateReqVO menuAddOrUpdateReqVO) {
        Menu menu = menuService.addOrUpdate(menuAddOrUpdateReqVO);
        return success(MenuConvert.INSTANCE.convertRespVO(menu));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "删除菜单")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:menu:del')")
    public CommonResult<Boolean> del(@Param(value = "id") String id) {
        return success(menuService.del(id));
    }

}
