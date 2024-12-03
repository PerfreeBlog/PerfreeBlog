package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import com.perfree.common.ArticleUtils;
import com.perfree.commons.annotation.FrontViewNodeRender;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.constant.ArticleConstant;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "文章页相关")
@Controller
public class ArticleController  extends BaseViewController {

    @Resource
    private ArticleService articleService;

    @GetMapping(value = {"/articleList/{pageIndex}", "/articleList", "article"})
    @Operation(summary = "文章列表页")
    @FrontViewNodeRender
    public String articleListPage(@PathVariable(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("articleList.html");
    }

    @GetMapping(value = {"/article/{slug}"})
    @Operation(summary = "文章页")
    @FrontViewNodeRender
    public String articlePage(@PathVariable(value = "slug", required = false) String slug, Model model,
                              HttpServletRequest request, HttpServletResponse response) {
        ArticleRespVO articleRespVO = articleService.getBySlugAndTypeAndStatus(slug, ArticleConstant.ARTICLE_TYPE_ARTICLE, ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        ArticleUtils.handleArticleModelAttribute(model, articleRespVO);
        if (articleRespVO != null) {
            articleService.viewCountHandle(request, response, articleRespVO.getId());
        }
        return themeView("article.html");
    }

    @GetMapping(value = {"/archive", "/archive/{pageIndex}"})
    @FrontViewNodeRender
    @Operation(summary = "文章归档页")
    public String index( @PathVariable(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        model.addAttribute("url",  SystemConstants.URL_ARCHIVE);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("archive.html");
    }

    @GetMapping(value = {"/article/search", "/article/search/{pageIndex}"})
    @FrontViewNodeRender
    public String searchListPage(@PathVariable(value = "pageIndex", required = false) Integer pageIndex, @RequestParam("title") String title, Model model) {
        model.addAttribute("url", SystemConstants.URL_ARTICLE_SEARCH);
        model.addAttribute("title", title);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("search.html");
    }
}
