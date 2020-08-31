package com.perfree.controller;

import com.perfree.model.Menu;
import com.perfree.model.User;
import com.perfree.service.MenuService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class BaseController {

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
        return user;
    }

    /**
     * 根据用户id获取后台菜单
     * @return List<Menu>
     */
    public List<Menu> getAdminMenuByUserId() {
        return menuService.getAdminMenuByUserId(getUser().getId());
    }
}
