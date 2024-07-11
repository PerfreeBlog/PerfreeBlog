package com.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/plugin/perfree-exam")
@Controller
public class ViewController {

    @GetMapping(value = {"/**"})
    public String uiRender() {
        return "/ui/index.html";
    }
}
