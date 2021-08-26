package com.perfree.controller;

import com.perfree.commons.JwtUtils;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Api controller基类
 */
@RestController
@CrossOrigin
@RequestMapping("/api")
public class BaseApiController {

    @Autowired
    private UserService userService;

    /**
     * 获取当前的登录用户
     * @return UserForm   当前的登录用户
     */
    public User getLoginUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        String account = JwtUtils.getUsername(token);
        return userService.getUserByAccount(account);
    }
}
