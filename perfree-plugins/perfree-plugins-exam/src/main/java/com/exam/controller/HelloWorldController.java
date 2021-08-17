package com.exam.controller;

import com.exam.service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloWorldController{

    @Autowired
    private HelloWorldService helloWorldService;
    @RequestMapping("/pp")
    @ResponseBody
    public String index1 () {
        return helloWorldService.index();
    }

    @RequestMapping("/pp2")
    @ResponseBody
    public String index2 () {
        return helloWorldService.index2();
    }

    @RequestMapping("/pp3")
    public String index3 (Model model) {
        model.addAttribute("article", "插件测试html");
        return "/static/index.html";
    }
}
