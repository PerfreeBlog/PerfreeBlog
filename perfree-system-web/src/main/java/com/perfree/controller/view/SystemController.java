package com.perfree.controller.view;

import com.perfree.commons.base.BaseViewController;
import com.perfree.model.Article;
import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SystemController extends BaseViewController {

    @GetMapping("/")
    public String index() {
        return themeView("index.html");
    }

    @GetMapping("/xx")
    public String xx() {
        return "/static/theme/setting.html";
    }
}
