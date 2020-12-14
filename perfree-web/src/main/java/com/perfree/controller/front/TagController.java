package com.perfree.controller.front;

import com.perfree.common.Constants;
import com.perfree.controller.BaseController;
import com.perfree.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TagController extends BaseController {

    @Autowired
    private ArticleService articleService;

    @RequestMapping("/tag/{tagId}/{pageIndex}")
    public String articleListPage(@PathVariable("pageIndex") int pageIndex,@PathVariable("tagId") String tagId, Model model) {
        model.addAttribute("pageIndex", pageIndex);
        model.addAttribute("tagId", tagId);
        model.addAttribute("url", Constants.ARTICLE_TAG + tagId + "/");
        return currentThemePage() + "/articleList";
    }

    @RequestMapping("/tag/{tagId}")
    public String articleListPage(@PathVariable("tagId") String tagId, Model model) {
        model.addAttribute("pageIndex", 1);
        model.addAttribute("tagId", tagId);
        model.addAttribute("url", Constants.ARTICLE_TAG + tagId + "/");
        return currentThemePage() + "/articleList";
    }
}
