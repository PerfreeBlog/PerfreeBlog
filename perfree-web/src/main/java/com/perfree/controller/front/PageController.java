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

    private void setArticle (String pageName, Model model) {
        MenuService menuService = SpringBeanUtils.getBean(MenuService.class);
        ArticleService articleService = SpringBeanUtils.getBean(ArticleService.class);
        Menu menu = menuService.getMenuByUrl(pageName );
        if (menu != null && menu.getArticleId() != null) {
            Article article = articleService.getById(menu.getArticleId().toString());
            model.addAttribute("article", article);
        }
    }

    public String pages(HttpServletRequest request, HttpServletResponse response,Model model) {
        String url = request.getServletPath();
        setArticle(url,model);
        if (url.endsWith(Constants.SEPARATOR)){
           url = url.substring(0, url.length() - 1);
        }
        model.addAttribute("url", url + Constants.SEPARATOR);
        return view(currentThemePage() + Constants.SEPARATOR + url + ".html");
    }

    public String pages(@PathVariable("pageIndex") int pageIndex,HttpServletRequest request, HttpServletResponse response,Model model) {
        String url = request.getServletPath();
        setArticle(url,model);
        url = url.substring(0, url.lastIndexOf("/"));
        model.addAttribute("url", url + Constants.SEPARATOR);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + Constants.SEPARATOR + url + ".html");
    }

}
