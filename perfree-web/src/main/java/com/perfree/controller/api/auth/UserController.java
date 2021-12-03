package com.perfree.controller.api.auth;

import com.perfree.base.BaseApiController;
import com.perfree.commons.ResponseBean;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@Api(value = "用户相关",tags = "用户模块")
@RequestMapping("/api/user")
@SuppressWarnings("all")
public class UserController extends BaseApiController {

    @GetMapping("/getLoginUser")
    @ApiOperation(value = "获取当前登录用户", notes = "获取当前登录用户")
    public ResponseBean getApiLoginUser(HttpServletRequest request) {
        return ResponseBean.success("success", getLoginUser(request));
    }
}
