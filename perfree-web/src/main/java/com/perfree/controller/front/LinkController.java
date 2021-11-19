package com.perfree.controller.front;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * 友链
 * @author Perfree
 */
@Controller
public class LinkController extends BaseController {

    @Autowired
    private ArticleService articleService;

    /**
     * 友链页
     * @return String
     */
    @RequestMapping("/link")
    public String index(HttpServletRequest request,Model model) {
        articleService.setMenuArticle("/link", model, request);
        model.addAttribute("url", Constants.URL_LINK);
        return view(currentThemePage() + "/link.html");
    }

    /**
     * 友链分页处理
     * @param pageIndex 页码
     * @param model model
     * @return String
     */
    @RequestMapping("/link/{pageIndex}")
    public String archivePage(@PathVariable("pageIndex") int pageIndex, HttpServletRequest request, Model model) {
        articleService.setMenuArticle("/link", model, request);
        model.addAttribute("url", Constants.URL_LINK);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + "/link.html");
    }
}
