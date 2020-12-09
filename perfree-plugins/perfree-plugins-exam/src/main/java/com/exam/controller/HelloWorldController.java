package com.exam.controller;

import com.exam.service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloWorldController {

    @Autowired
    private HelloWorldService helloWorldService;
    @RequestMapping("/plugins")
    @ResponseBody
    public String index () {
        return helloWorldService.index();
    }
}
