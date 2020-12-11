package com.perfree.controller.front;

import com.perfree.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ArticleController extends BaseController {

    @RequestMapping("/articleList/{pageIndex}")
    public String articleListPage(@PathVariable("pageIndex") int pageIndex) {
        return currentThemePage() + "/articleList";
    }
}
