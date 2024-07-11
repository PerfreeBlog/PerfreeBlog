package com.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 渲染打包后的前端页面,请按照/plugin/插件id/**的方式进行渲染
 */
@RequestMapping("/plugin/perfree-demo")
@Controller
public class ViewController {

    @GetMapping(value = {"/**"})
    public String uiRender() {
        return "/ui/index.html";
    }
}
