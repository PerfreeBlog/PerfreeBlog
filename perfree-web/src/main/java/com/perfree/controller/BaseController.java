package com.perfree.controller;

import com.perfree.common.Constants;
import com.perfree.common.OptionCache;
import com.perfree.model.Menu;
import com.perfree.model.User;
import com.perfree.service.MenuService;
import com.perfree.service.OptionService;
import com.perfree.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class BaseController {
    @Autowired
    private UserService userService;
    @Autowired
    private MenuService menuService;

    /**
     * 获取已登录用户信息
     * @return User
     */
    public User getUser(){
        Subject subject = SecurityUtils.getSubject();
        User user=new User();
        BeanUtils.copyProperties(subject.getPrincipals().getPrimaryPrincipal(), user);
        user = userService.getById(user.getId().toString());
        user.setPassword(null);
        user.setSalt(null);
        return user;
    }

    /**
     * 根据用户id获取后台菜单
     * @return List<Menu>
     */
    public List<Menu> getMenuByUserIdAndType() {
        return menuService.getMenuByUserIdAndType(getUser().getId(), 1);
    }

    /**
     * 获取当前启用的主题
     * @return String
     */
    public String currentTheme() {
        return OptionCache.getOption(Constants.WEB_THEME);
    }
}
