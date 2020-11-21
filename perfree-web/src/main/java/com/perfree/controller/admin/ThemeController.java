package com.perfree.controller.admin;

import com.perfree.controller.BaseController;
import com.perfree.model.Theme;
import com.perfree.service.OptionService;
import com.perfree.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class ThemeController extends BaseController {
    @Autowired
    private OptionService optionService;
    @Autowired
    private ThemeService themeService;

    @GetMapping("/theme")
    public String themePage(Model model){
        List<Theme> themeList = themeService.getAllTheme();
        model.addAttribute("themeList",themeList);
        model.addAttribute("currTheme",optionService.getOptionByKey("WEB_THEME"));
        return "admin/pages/theme/theme";
    }
}