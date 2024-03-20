package com.perfree.controller;


import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.FrontViewNodeRender;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 统一处理前台HTML渲染
 */
@Controller
@RequestMapping("/")
public class FrontViewController extends BaseController {

    @GetMapping("/")
    @Operation(summary = "前台首页")
    @FrontViewNodeRender
    public String index(Model model) {
        model.addAttribute("url", Constants.URL_ARTICLE_LIST);
        return view(currentThemePage() + "/index.html");
    }

    @GetMapping("/login")
    @Operation(summary = "登陆页")
    public String login() {
        return view("/login.html", "/login.html", "static/admin/pages/login/login.html");
    }

    @GetMapping("/html/{name}")
    @FrontViewNodeRender
    @Operation(summary = "自定义页")
    public String renderHtml(@PathVariable String name) {
        return view(currentThemePage() + "/html/" + name + ".html");
    }

    @GetMapping("/register")
    @Operation(summary = "注册页")
    public String register() {
        return view("/register.html", "/register.html", "static/admin/pages/register/register.html");
    }

    @GetMapping("/restPassword")
    @Operation(summary = "忘记密码页")
    public String restPassword() {
        return view("/restPassword.html", "/restPassword.html", "static/admin/pages/restPassword/restPassword.html");
    }

    @GetMapping("/restPasswordStep2")
    @Operation(summary = "忘记密码页")
    public String restPasswordStep2() {
        return view("/restPassword-step2.html", "/restPassword-step2.html", "static/admin/pages/restPassword/restPassword-step2.html");
    }
}
