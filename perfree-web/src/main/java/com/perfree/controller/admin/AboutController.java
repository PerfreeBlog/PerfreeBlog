package com.perfree.controller.admin;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.DynamicDataSource;
import com.perfree.config.SwaggerProperties;
import com.perfree.permission.AdminMenu;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE, Constants.ROLE_USER}, logical= Logical.OR)
public class AboutController extends BaseController {

    @Value("${version}")
    private String version;
    @Autowired
    private SwaggerProperties swaggerProperties;

    @GetMapping("/about")
    @AdminMenu(name = "关于系统", seq = 3, groupId = Constants.ADMIN_MENU_GROUP_SETTING,
            role = {Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE, Constants.ROLE_USER})
    public String index(Model model) {
        model.addAttribute("version", version);
        model.addAttribute("dataBase", DynamicDataSource.dataSourceType);
        model.addAttribute("javaVersion", System.getProperty("java.version"));
        model.addAttribute("osName", System.getProperty("os.name"));
        model.addAttribute("osArch", System.getProperty("os.arch"));
        model.addAttribute("swaggerEnable", swaggerProperties.getEnable() ? "是":"否");
        return view("static/admin/pages/about/about.html");
    }
}
