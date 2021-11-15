package com.perfree.base;

import com.perfree.commons.JwtUtils;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
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
        if (StringUtils.isNotBlank(token)) {
            String account = JwtUtils.getUsername(token);
            User userByAccount = userService.getUserByAccount(account);
            if (userByAccount != null) {
                userByAccount.setPassword(null);
                userByAccount.setSalt(null);
                return userByAccount;
            }
        }

        Subject subject = SecurityUtils.getSubject();
        User user=new User();
        PrincipalCollection principals = subject.getPrincipals();
        if (principals == null) {
            return null;
        }
        BeanUtils.copyProperties(principals.getPrimaryPrincipal(), user);
        user = userService.getById(user.getId().toString());
        user.setPassword(null);
        user.setSalt(null);
        return user;
    }
}
