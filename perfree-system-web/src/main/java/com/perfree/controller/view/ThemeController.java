package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ThemeController extends BaseViewController {

    @GetMapping("/console/theme/setting")
    public String settingPage(){
        return themeView("setting.html", "static/admin/pages/theme/setting.html");
    }
}
