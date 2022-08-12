package com.perfree.controller.front;

import com.perfree.commons.Constants;
import com.perfree.base.BaseController;
import com.perfree.commons.FrontViewNodeRender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ArticleSearchController extends BaseController {
    @RequestMapping("/article/search")
    @FrontViewNodeRender
    public String searchListPage(String title, Model model) {
        model.addAttribute("url", Constants.URL_ARTICLE_SEARCH);
        model.addAttribute("title", title);
        model.addAttribute("pageIndex", 1);
        return view(currentThemePage() + "/search.html");
    }

    @RequestMapping("/article/search/{pageIndex}")
    @FrontViewNodeRender
    public String searchListPage(String title, @PathVariable("pageIndex") int pageIndex, Model model) {
        model.addAttribute("url", Constants.URL_ARTICLE_SEARCH);
        model.addAttribute("title", title);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + "/search.html");
    }
}
