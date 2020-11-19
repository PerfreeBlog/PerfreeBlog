package com.perfree.controller.admin;

import com.perfree.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class DashboardController extends BaseController {


    @RequestMapping("/dashboard")
    public String index() {
        return "admin/pages/dashboard/dashboard";
    }
}
