package com.perfree.controller.admin;

import com.perfree.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ArticleController extends BaseController {

    @RequestMapping("/article")
    public String index() {
        return "admin/pages/article/article_list";
    }

    @RequestMapping("/articleCreate")
    public String articleCreate() {
        return "admin/pages/article/article_create";
    }
}
