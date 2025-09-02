package com.perfree.controller.auth.role;


import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.role.vo.*;
import com.perfree.convert.role.RoleConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.Role;
import com.perfree.model.RoleMenu;
import com.perfree.service.role.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.noear.solon.annotation.Mapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

/**
 * @description 角色
 * @author Perfree
 * @version 1.0.0
 * @create 2023/1/16 10:16
 **/
@Controller
@Tag(name = "角色相关接口")
@Mapping("api/auth/role")
public class RoleController extends BaseController {

    @Inject
    private RoleService roleService;

    @Post
    @Mapping("/page")
    @Operation(summary = "角色分页列表")
    @PreAuthorize("@ss.hasPermission('admin:role:query')")
    public CommonResult<PageResult<RoleRespVO>> page(@Body RolePageReqVO pageVO) {
        startPage(pageVO);
        List<Role> roleList = roleService.rolePage(pageVO);
        return pageSuccess(RoleConvert.INSTANCE.convertRespListVO(roleList));
    }

    @Get
    @Mapping("/getRoleMenus")
    @Operation(summary = "获取角色所拥有的菜单列表")
    public CommonResult<List<String>> getRoleMenus(@Param(value = "id") Integer id) {
        List<RoleMenu> roleMenus = roleService.getRoleMenus(id);
        List<String> result = new ArrayList<>();
        for (RoleMenu roleMenu : roleMenus) {
            result.add(roleMenu.getMenuId());
        }
        return success(result);
    }

    @Post
    @Mapping("/assignRoleMenu")
    @Operation(summary = "设置角色菜单权限")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:role:permission')")
    public CommonResult<Boolean> assignRoleMenu(@Body @Valid RoleMenuReqVO roleMenuReqVO) {
        return success(roleService.assignRoleMenu(roleMenuReqVO));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "获取角色")
    public CommonResult<RoleRespVO> get(@Param(value = "id") Integer id) {
        return success(RoleConvert.INSTANCE.convertRespVO(roleService.get(id)));
    }

    @Get
    @Mapping("/listAll")
    @Operation(summary = "获取所有角色")
    public CommonResult<List<RoleRespVO>> listAll() {
        return success(RoleConvert.INSTANCE.convertRespListVO(roleService.list()));
    }

    @Post
    @Mapping("/add")
    @Operation(summary = "添加角色")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:role:create')")
    public CommonResult<RoleRespVO> add(@Body @Valid RoleAddReqVO roleAddReqVO) {
        return success(RoleConvert.INSTANCE.convertRespVO(roleService.add(roleAddReqVO)));
    }

    @Post
    @Mapping("/update")
    @Operation(summary = "更新角色")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:role:update')")
    public CommonResult<RoleRespVO> update(@Body @Valid RoleUpdateReqVO roleUpdateReqVO) {
        return success(RoleConvert.INSTANCE.convertRespVO(roleService.update(roleUpdateReqVO)));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "删除角色")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:role:delete')")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return success(roleService.del(id));
    }
}
