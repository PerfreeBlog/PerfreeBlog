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
 * @description 示例插件: controller
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Controller
public class HelloWorldController{

    @Autowired
    private HelloWorldService helloWorldService;

    /** 
     * @description 返回字符串
     * @return java.lang.String
     * @author Perfree
     */ 
    @RequestMapping("/plugin/testStr")
    @ResponseBody
    public String testStr () {
        return "插件测试:返回字符串";
    }

    /**
     * @description 查询数据库所有文章
     * @return java.util.List<com.exam.model.Article>
     * @author Perfree
     */
    @RequestMapping("/plugin/testQueryArticle")
    @ResponseBody
    public List<Article> testQueryArticle() {
        return helloWorldService.testQueryArticle();
    }

    /**
     * @description 返回Html
     * @return java.lang.String
     * @author Perfree
     */
    @RequestMapping("/plugin/testHtml")
    public String testHtml (Model model) {
        model.addAttribute("article", "插件测试: 返回html");
        return "/exam-static/index.html";
    }
}
