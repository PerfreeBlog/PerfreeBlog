package com.perfree.controller.admin;

import com.perfree.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class MenuController extends BaseController {
    /**
     * 菜单管理列表页
     * @return String
     */
    @RequestMapping("/menu")
    public String index() {
        return "admin/pages/menu/menu_list";
    }
}
