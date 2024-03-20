package com.perfree.controller;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.DynamicDataSource;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 统一处理后台HTML渲染
 */
@Controller
@RequestMapping("/")
public class AdminViewController extends BaseController {

    @Value("${version}")
    private String version;

    @GetMapping("/admin")
    @Operation(summary = "后台布局首页")
    public String adminIndex(Model model) {
        model.addAttribute("user", getUser());
        return view("static/admin/pages/index.html");
    }

    @GetMapping("/admin/about")
    @Operation(summary = "关于页面")
    public String index() {
        return view("static/admin/pages/about/about.html");
    }

    @GetMapping("/admin/dashboard")
    public String dashboard() {
        return view("static/admin/pages/dashboard/dashboard.html");
    }

    @GetMapping("/admin/setting")
    public String setting() {
        return view("static/admin/pages/settings/setting.html");
    }
}
