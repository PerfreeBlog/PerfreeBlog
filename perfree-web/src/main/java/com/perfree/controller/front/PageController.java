package com.perfree.controller.front;

import com.perfree.common.Constants;
import com.perfree.controller.BaseController;
import com.perfree.model.Article;
import com.perfree.model.Menu;
import com.perfree.service.ArticleService;
import com.perfree.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController extends BaseController {
    @Autowired
    private ArticleService articleService;

    @Autowired
    private MenuService menuService;

    @RequestMapping(value = "/page/{pageName}",produces = {"text/html"})
    public String page(@PathVariable("pageName") String pageName, Model model) {
        setArticle(pageName, model);
        model.addAttribute("url", "/page/" + pageName + Constants.SEPARATOR);
        return view(currentThemePage() + Constants.SEPARATOR + pageName + ".html");
    }

    @RequestMapping("/page/{pageName}/{pageIndex}")
    public String page(@PathVariable("pageName") String pageName,@PathVariable("pageIndex") int pageIndex, Model model) {
        setArticle(pageName, model);
        model.addAttribute("url", "/page/" + pageName + Constants.SEPARATOR);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + Constants.SEPARATOR + pageName + ".html");
    }

    private void setArticle (String pageName, Model model) {
        Menu menu = menuService.getMenuByUrl("/page/" + pageName );
        if (menu != null && menu.getArticleId() != null) {
            Article article = articleService.getById(menu.getArticleId().toString());
            model.addAttribute("article", article);
        }
    }
}
