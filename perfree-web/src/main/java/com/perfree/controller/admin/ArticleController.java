package com.perfree.controller.admin;

import com.perfree.controller.BaseController;
import com.perfree.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ArticleController extends BaseController {

    @Autowired
    private ArticleService articleService;

    @RequestMapping("/article")
    public String index() {
        return "admin/pages/article/article_list";
    }

    @RequestMapping("/article/addPage")
    public String addPage() {
        return "admin/pages/article/article_create";
    }
}
