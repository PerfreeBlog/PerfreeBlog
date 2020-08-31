package com.perfree.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ArticleController extends BaseController{

    @RequestMapping("/articleList")
    public String index() {
        return "admin/article_list";
    }
}
