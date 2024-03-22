package com.perfree.controller.api.user;

import com.perfree.base.BaseApiController;
import com.perfree.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@Tag(name = "用户相关")
@RequestMapping("/api/user")
public class UserController extends BaseApiController {

    @Resource
    private UserService userService;
}
