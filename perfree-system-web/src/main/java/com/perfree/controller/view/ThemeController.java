package com.perfree.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("/admin/theme")
public class ThemeController {

    @RequestMapping("/setting")
    public String themeSettingView() {
        return "theme/setting";
    }
}
