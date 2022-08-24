package com.perfree.controller.api;

import com.perfree.base.BaseApiController;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.User;
import com.perfree.service.UserService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin
@Api(value = "用户相关",tags = "用户模块")
@RequestMapping(value = {"/api/user", "/user"})
@SuppressWarnings("all")
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

    @GetMapping("/getAllList")
    @ApiOperation(value = "获取所有用户", notes = "获取所有用户")
    public ResponseBean getAllList() {
        List<User> users = userService.allList();
        return ResponseBean.success("success", users);
    }

    @GetMapping("/getList")
    @ApiOperation(value = "用户分页数据", notes = "用户分页数据,可根据用户名模糊查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "name", value = "用户名", dataTypeClass = String.class, paramType = "query"),
    })
    public Pager<User> getList(@ApiIgnore Pager<User> pager, @ApiIgnore String name) {
        pager.setForm(new User());
        pager.getForm().setUserName(name);
        return userService.list(pager);
    }
}
