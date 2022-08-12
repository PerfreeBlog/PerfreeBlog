package com.perfree.controller.front;

import com.perfree.commons.Constants;
import com.perfree.base.BaseController;
import com.perfree.commons.FrontViewNodeRender;
import com.perfree.model.Category;
import com.perfree.model.Tag;
import com.perfree.service.ArticleService;
import com.perfree.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CategoryController extends BaseController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping("/category/{slugOrId}/{pageIndex}")
    @FrontViewNodeRender
    public String articleListPage(@PathVariable("pageIndex") int pageIndex, @PathVariable("slugOrId") String slugOrId, Model model) {
        Category category = categoryService.getBySlug(slugOrId);
        if (null == category) {
            category = categoryService.getById(slugOrId);
        }
        model.addAttribute("pageIndex", pageIndex);
        model.addAttribute("categoryId", category.getId());
        model.addAttribute("url", Constants.URL_ARTICLE_CATEGORY + category.getId()  + "/");
        return view(currentThemePage() + "/articleList.html");
    }

    @RequestMapping("/category/{slugOrId}")
    @FrontViewNodeRender
    public String articleListPage(@PathVariable("slugOrId") String slugOrId, Model model) {
        Category category = categoryService.getBySlug(slugOrId);
        if (null == category) {
            category = categoryService.getById(slugOrId);
        }
        model.addAttribute("pageIndex", 1);
        model.addAttribute("categoryId", category.getId());
        model.addAttribute("url", Constants.URL_ARTICLE_CATEGORY + category.getId()  + "/");
        return view(currentThemePage() + "/articleList.html");
    }

    @RequestMapping("/categories")
    @FrontViewNodeRender
    public String categories(Model model) {
        model.addAttribute("url", Constants.URL_CATEGORIES);
        return view(currentThemePage() + "/categories.html");
    }

    @RequestMapping("/categories/{pageIndex}")
    @FrontViewNodeRender
    public String categoriesPage(@PathVariable("pageIndex") int pageIndex,Model model) {
        model.addAttribute("url", Constants.URL_CATEGORIES);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + "/categories.html");
    }
}
