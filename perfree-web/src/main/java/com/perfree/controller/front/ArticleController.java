package com.perfree.controller.front;

import com.perfree.controller.BaseController;
import com.perfree.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ArticleController extends BaseController {
    @Autowired
    private ArticleService articleService;

    @RequestMapping("/articleList/{pageIndex}")
    public String articleListPage(@PathVariable("pageIndex") int pageIndex,Model model) {
        model.addAttribute("pageIndex", pageIndex);
        return currentThemePage() + "/articleList";
    }

    @RequestMapping("/article/{articleId}")
    public String articlePage(@PathVariable("articleId") String articleId, Model model) {
        if (articleId.contains("-")) {
            String[] split = articleId.split("-");
            articleId = split[0];
            model.addAttribute("commentIndex", split[1]);
        }
        model.addAttribute("articleId", articleId);
        model.addAttribute("article", articleService.getById(articleId));
        return currentThemePage() + "/article";
    }

    @RequestMapping("/article/search")
    public String searchListPage(String title, Model model) {
        model.addAttribute("title", title);
        model.addAttribute("pageIndex", 1);
        return currentThemePage() + "/articleList";
    }

    @RequestMapping("/article/search/{pageIndex}")
    public String searchListPage(String title, @PathVariable("pageIndex") int pageIndex, Model model) {
        model.addAttribute("title", title);
        model.addAttribute("pageIndex", pageIndex);
        return currentThemePage() + "/articleList";
    }
}
