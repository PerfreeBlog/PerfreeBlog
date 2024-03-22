package com.perfree.controller.view;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import io.swagger.v3.oas.annotations.Operation;
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
    @GetMapping("/admin")
    @Operation(summary = "后台布局首页")
    public String adminIndex(Model model) {
        return view("static/admin/pages/index.html");
    }

    @GetMapping("/admin/about")
    @Operation(summary = "关于页面")
    public String index() {
        return view("static/admin/pages/about/about.html");
    }

    @GetMapping("/admin/dashboard")
    @Operation(summary = "控制台")
    public String dashboard() {
        return view("static/admin/pages/dashboard/dashboard.html");
    }

    @GetMapping("/admin/setting")
    @Operation(summary = "网站设置")
    public String setting() {
        return view("static/admin/pages/settings/setting.html");
    }

    @GetMapping("/admin/attach")
    @Operation(summary = "附件管理")
    public String attach() {
        return view("static/admin/pages/attach/attach_list.html");
    }

    @GetMapping("/admin/site")
    @Operation(summary = "多站点配置")
    public String site() {
        return view("static/admin/pages/site/site_list.html");
    }

    @GetMapping("/admin/site/addPage")
    @Operation(summary = "多站点-添加")
    public String siteAddPage() {
        return view("static/admin/pages/site/site_add.html");
    }

    @GetMapping("/admin/site/editPage")
    @Operation(summary = "多站点-修改")
    public String siteEditPage() {
        return view("static/admin/pages/site/site_edit.html");
    }


    @GetMapping("/admin/user")
    @Operation(summary = "用户管理")
    public String user() {
        return view("static/admin/pages/user/user_list.html");
    }

    @GetMapping("/admin/user/addPage")
    @Operation(summary = "用户管理-添加")
    public String addPage() {
        return view("static/admin/pages/user/user_add.html");
    }

    @GetMapping("/user/editPage")
    @Operation(summary = "用户管理-编辑")
    public String editPage() {
        return view("static/admin/pages/user/user_edit.html");
    }

    @GetMapping("/admin/menu")
    @Operation(summary = "菜单管理")
    public String menu() {
        return view("static/admin/pages/menu/menu_list.html");
    }

    @GetMapping("/admin/menu/addPage")
    @Operation(summary = "菜单管理-添加")
    public String menuAddPage() {
        return view("static/admin/pages/menu/menu_add.html");
    }

    @GetMapping("/admin/menu/editPage")
    @Operation(summary = "菜单管理-修改")
    public String menuEditPage() {
        return view("static/admin/pages/menu/menu_edit.html");
    }
}
