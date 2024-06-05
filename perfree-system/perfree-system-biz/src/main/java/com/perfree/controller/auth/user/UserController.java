package com.perfree.controller.auth.user;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.user.vo.*;
import com.perfree.convert.user.UserConvert;
import com.perfree.model.User;
import com.perfree.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import static com.perfree.commons.common.CommonResult.success;

/**
 * @description 用户
 * @author Perfree
 * @version 1.0.0
 **/
@RestController
@Tag(name = "用户相关接口")
@RequestMapping("api/auth/user")
public class UserController {

    @Resource
    private UserService userService;

    @PostMapping("/page")
    @Operation(summary = "用户分页列表")
    public CommonResult<PageResult<UserRespVO>> page(@RequestBody UserPageReqVO pageVO) {
        PageResult<User> userPageResult = userService.userPage(pageVO);
        return success(UserConvert.INSTANCE.convertPageResultVO(userPageResult));
    }

    @GetMapping("/get")
    @Operation(summary = "获取用户")
    public CommonResult<UserRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(UserConvert.INSTANCE.convertRespVO(userService.get(id)));
    }

    @PostMapping("/add")
    @Operation(summary = "添加")
    public CommonResult<UserRespVO> add(@RequestBody @Valid UserAddReqVO userAddReqVO) {
        return success(UserConvert.INSTANCE.convertRespVO(userService.addUser(userAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新")
    public CommonResult<UserRespVO> update(@RequestBody @Valid UserUpdateReqVO userUpdateReqVO) {
        return success(UserConvert.INSTANCE.convertRespVO(userService.updateUser(userUpdateReqVO)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "删除用户")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(userService.del(id));
    }

    @PostMapping("/updateUserRole")
    @Operation(summary = "更新用户角色")
    public CommonResult<Boolean> updateUserRole(@RequestBody @Valid UserRoleReqVO userRoleReqVO) {
        return success(userService.updateUserRole(userRoleReqVO));
    }

    @GetMapping("/getUserRole")
    @Operation(summary = "获取用户角色id集合")
    public CommonResult<UserRoleRespVO> getUserRole(@RequestParam(value = "id") Integer id) {
        return success(userService.getUserRole(id));
    }

    @PostMapping("/resetPassword")
    @Operation(summary = "重置密码")
    public CommonResult<Boolean> resetPassword(@RequestBody @Valid UserResetPasswordReqVO resetPasswordReqVO) {
        return success(userService.resetPassword(resetPasswordReqVO));
    }

}
