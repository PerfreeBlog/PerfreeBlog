package com.perfree.controller.front;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.model.Menu;
import com.perfree.service.ArticleService;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class PageController extends BaseController {

    public String pages(HttpServletRequest request, HttpServletResponse response,Model model) {
        String url = request.getServletPath();
        ArticleService articleService = SpringBeanUtils.getBean(ArticleService.class);
        Menu menu = articleService.setMenuArticle(url, model, request);
        if (url.endsWith(Constants.SEPARATOR)){
           url = url.substring(0, url.length() - 1);
        }
        model.addAttribute("url", url + Constants.SEPARATOR);
        return pageView(currentThemePage() + Constants.SEPARATOR + url + ".html", menu);
    }

    public String pages(@PathVariable("pageIndex") int pageIndex,HttpServletRequest request, HttpServletResponse response,Model model) {
        String url = request.getServletPath();
        ArticleService articleService = SpringBeanUtils.getBean(ArticleService.class);
        Menu menu = articleService.setMenuArticle(url, model, request);
        url = url.substring(0, url.lastIndexOf("/"));
        model.addAttribute("url", url + Constants.SEPARATOR);
        model.addAttribute("pageIndex", pageIndex);
        return pageView(currentThemePage() + Constants.SEPARATOR + url + ".html", menu);
    }

}
