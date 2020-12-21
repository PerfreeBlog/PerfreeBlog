package com.perfree.controller.front;

import com.perfree.common.Constants;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.controller.BaseController;
import com.perfree.model.Article;
import com.perfree.model.Menu;
import com.perfree.service.ArticleService;
import com.perfree.service.MenuService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PageController extends BaseController {

    private Menu setArticle (String pageName, Model model) {
        MenuService menuService = SpringBeanUtils.getBean(MenuService.class);
        ArticleService articleService = SpringBeanUtils.getBean(ArticleService.class);
        Menu menu = menuService.getMenuByUrl(pageName );
        if (menu != null && menu.getArticleId() != null) {
            Article article = articleService.getById(menu.getArticleId().toString());
            model.addAttribute("article", article);
            model.addAttribute(Constants.SEO_TITLE, article.getTitle());
            model.addAttribute(Constants.SEO_KEYWORD, article.getMetaKeywords());
            model.addAttribute(Constants.SEO_DESC, article.getMetaDescription());
        }
        return menu;
    }

    public String pages(HttpServletRequest request, HttpServletResponse response,Model model) {
        String url = request.getServletPath();
        Menu menu = setArticle(url, model);
        if (url.endsWith(Constants.SEPARATOR)){
           url = url.substring(0, url.length() - 1);
        }
        model.addAttribute("url", url + Constants.SEPARATOR);
        return pageView(currentThemePage() + Constants.SEPARATOR + url + ".html", menu);
    }

    public String pages(@PathVariable("pageIndex") int pageIndex,HttpServletRequest request, HttpServletResponse response,Model model) {
        String url = request.getServletPath();
        Menu menu = setArticle(url, model);
        url = url.substring(0, url.lastIndexOf("/"));
        model.addAttribute("url", url + Constants.SEPARATOR);
        model.addAttribute("pageIndex", pageIndex);
        return pageView(currentThemePage() + Constants.SEPARATOR + url + ".html", menu);
    }

}
