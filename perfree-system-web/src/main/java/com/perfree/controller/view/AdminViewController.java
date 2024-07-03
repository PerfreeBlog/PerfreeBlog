package com.perfree.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminViewController {

    @GetMapping("")
    public String index() {
        return "/static/admin/index.html";
    }

    @GetMapping("/2")
    public String index2() {
        return "/static/admin/index2.html";
    }
}
