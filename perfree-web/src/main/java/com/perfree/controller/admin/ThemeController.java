package com.perfree.controller.admin;

import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Theme;
import com.perfree.service.OptionService;
import com.perfree.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfig;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class ThemeController extends BaseController {
    @Autowired
    private ThemeService themeService;

    @GetMapping("/theme")
    public String themePage(Model model){
        List<Theme> themeList = themeService.getAllTheme();
        model.addAttribute("themeList",themeList);
        return "admin/pages/theme/theme";
    }

    @PostMapping("/theme/switch")
    @ResponseBody
    public ResponseBean switchTheme(@RequestBody Theme theme){
        if (themeService.switchTheme(theme) > 0) {
            return ResponseBean.success("主题切换成功", null);
        }
        return ResponseBean.fail("主题切换失败", null);
    }
}