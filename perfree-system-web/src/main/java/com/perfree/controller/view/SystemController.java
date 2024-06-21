package com.perfree.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SystemController {

    @GetMapping("/")
    public String index() {
        return "/static/theme/setting.html";
    }

    @GetMapping("/xx")
    public String xx() {
        return "/static/theme/setting.html";
    }
}
