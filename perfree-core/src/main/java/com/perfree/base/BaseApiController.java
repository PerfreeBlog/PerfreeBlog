package com.perfree.base;

import com.perfree.commons.JwtUtils;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Api controller基类
 */
@RestController
@CrossOrigin
@RequestMapping("/api")
public class BaseApiController extends BaseController{

    @Autowired
    private UserService userService;

    /**
     * 获取当前的登录用户
     * @return UserForm   当前的登录用户
     */
    public User getLoginUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (StringUtils.isNotBlank(token)) {
            String account = JwtUtils.getUsername(token);
            User userByAccount = userService.getUserByAccount(account);
            if (userByAccount != null) {
                userByAccount.setPassword(null);
                userByAccount.setSalt(null);
                return userByAccount;
            }
        }
        return getUser();
    }
}
