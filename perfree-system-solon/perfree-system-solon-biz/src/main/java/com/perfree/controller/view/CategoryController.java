package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import com.perfree.commons.annotation.FrontViewNodeRender;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.controller.auth.category.vo.CategoryRespVO;
import com.perfree.service.category.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "分类页相关")
@Controller
public class CategoryController extends BaseViewController {

    @Inject
    private CategoryService categoryService;

    @Get
    @Mapping(value = "/category/{slug}/{pageIndex}")
    @Operation(summary = "分类文章列表页")
    @FrontViewNodeRender
    public String categoryArticlePage(@Path("slug") String slug, @Path(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        CategoryRespVO category = categoryService.getBySlug(slug);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        model.addAttribute("categoryId", category.getId());
        model.addAttribute("category", category);
        model.addAttribute("url", SystemConstants.URL_ARTICLE_CATEGORY + category.getSlug()  + "/");
        return themeView("articleList.html");
    }

    @Get
    @Mapping(value = "/category/{slug}")
    @Operation(summary = "分类文章列表页")
    @FrontViewNodeRender
    public String categoryArticle(@Path("slug") String slug, @Path(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        CategoryRespVO category = categoryService.getBySlug(slug);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        model.addAttribute("categoryId", category.getId());
        model.addAttribute("category", category);
        model.addAttribute("url", SystemConstants.URL_ARTICLE_CATEGORY + category.getSlug()  + "/");
        return themeView("articleList.html");
    }

    @Get
    @Mapping(value = "/categories/{pageIndex}")
    @FrontViewNodeRender
    @Operation(summary = "分类页")
    public String categoriesPage(@Path(value = "pageIndex", required = false) Integer pageIndex,Model model) {
        model.addAttribute("url", SystemConstants.URL_CATEGORIES);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("categories.html");
    }

    @Get
    @Mapping(value = "/categories")
    @FrontViewNodeRender
    @Operation(summary = "分类页")
    public String categories(@Path(value = "pageIndex", required = false) Integer pageIndex,Model model) {
        model.addAttribute("url", SystemConstants.URL_CATEGORIES);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("categories.html");
    }
}
