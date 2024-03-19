package com.perfree.controller.api;

import com.perfree.base.BaseApiController;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.User;
import com.perfree.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Tag(name = "用户相关")
@RequestMapping(value = {"/api/user", "/user"})
@SuppressWarnings("all")
public class UserController extends BaseApiController {
    @Resource
    private UserService userService;

    @GetMapping("/getLoginUser")
    @Operation(summary = "获取当前登录用户")
    public ResponseBean getApiLoginUser(HttpServletRequest request) {
        return ResponseBean.success("success", getLoginUser(request));
    }

    @GetMapping("/getById")
    @Operation(summary = "根据用户ID获取用户信息")
    public ResponseBean getById(@RequestParam String userId) {
        User user = userService.getById(userId);
        user.setPassword(null);
        user.setSalt(null);
        return ResponseBean.success("success", user);
    }

    @GetMapping("/getAllList")
    @Operation(summary = "获取所有用户")
    public ResponseBean getAllList() {
        List<User> users = userService.allList();
        return ResponseBean.success("success", users);
    }

    @GetMapping("/getList")
    @Operation(summary = "用户分页数据")
    public Pager<User> getList(Pager<User> pager, String name) {
        pager.setForm(new User());
        pager.getForm().setUserName(name);
        return userService.list(pager);
    }
}
