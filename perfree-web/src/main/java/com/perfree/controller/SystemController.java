package com.perfree.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 控制首页地址
 */
@Controller
public class SystemController {

    /**
     * 后台首页
     * @return String
     */
    @RequestMapping("/admin")
    public String adminIndex() {
        return "admin/index";
    }

    /**
     * 前台首页
     * @return String
     */
    @RequestMapping("/")
    public String index() {
        return "themes/perfree/index";
    }

    /**
     * 登陆页
     * @return String
     */
    @RequestMapping("/login")
    public String login() {
        return "public/login";
    }
}
