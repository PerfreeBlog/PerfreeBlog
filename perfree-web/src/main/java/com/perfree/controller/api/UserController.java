package com.perfree.controller.api;

import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseApiController;
import com.perfree.model.User;
import com.perfree.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@Api(value = "用户相关",tags = "用户模块")
@RequestMapping("/api/user")
public class UserController extends BaseApiController {

    @Autowired
    private UserService userService;

    @GetMapping("/getLoginUser")
    @ApiOperation(value = "获取当前登录用户", notes = "获取当前登录用户")
    public ResponseBean getApiLoginUser(HttpServletRequest request) {
        return ResponseBean.success("success", getLoginUser(request));
    }

    @GetMapping("/getById")
    @ApiOperation(value = "根据用户ID获取用户信息", notes = "根据用户ID获取用户信息")
    public ResponseBean getById(@ApiParam(name="userId",value="用户ID",required=true) @RequestParam String userId) {
        User user = userService.getById(userId);
        user.setPassword(null);
        user.setSalt(null);
        return ResponseBean.success("success", user);
    }
}
