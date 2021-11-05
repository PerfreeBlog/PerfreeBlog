package com.exam.controller;

import com.exam.model.Article;
import com.exam.service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @description 扩展插件: controller示例
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Controller
public class HelloWorldController{

    @Autowired
    private HelloWorldService helloWorldService;

    @RequestMapping("/plugin/test1")
    @ResponseBody
    public String test1 () {
        return "插件测试:返回字符串";
    }

    @RequestMapping("/plugin/test2")
    @ResponseBody
    public List<Article> test2 () {
        return helloWorldService.test2();
    }

    @RequestMapping("/plugin/test3")
    public String index3 (Model model) {
        model.addAttribute("article", "插件测试: 返回html");
        return "/static-exam/index.html";
    }
}
