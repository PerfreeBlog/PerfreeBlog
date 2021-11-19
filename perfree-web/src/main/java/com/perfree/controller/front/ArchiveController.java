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
 * 文章归档
 * @author Perfree
 */
@Controller
public class ArchiveController extends BaseController {
    @Autowired
    private ArticleService articleService;

    /**
     * 文章归档页
     * @return String
     */
    @RequestMapping("/archive")
    public String index(HttpServletRequest request, Model model) {
        articleService.setMenuArticle("/link", model, request);
        model.addAttribute("url", Constants.URL_ARCHIVE);
        return view(currentThemePage() + "/archive.html");
    }

    /**
     * 文章归档页分页处理
     * @param pageIndex 页码
     * @param model model
     * @return String
     */
    @RequestMapping("/archive/{pageIndex}")
    public String archivePage(@PathVariable("pageIndex") int pageIndex,HttpServletRequest request, Model model) {
        articleService.setMenuArticle("/link", model, request);
        model.addAttribute("url", Constants.URL_ARCHIVE);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + "/archive.html");
    }
}
