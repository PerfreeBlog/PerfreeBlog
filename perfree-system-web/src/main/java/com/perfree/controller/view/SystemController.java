package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import com.perfree.constant.ArticleConstant;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.model.Article;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "页面视图相关")
@Controller
public class SystemController extends BaseViewController {

    @Resource
    private ArticleService articleService;

    @GetMapping("/")
    @Operation(summary = "首页")
    public String index() {
        return themeView("index.html");
    }

    @GetMapping(value = {"/articleList/{pageIndex}", "/articleList", "article"})
    @Operation(summary = "文章列表页")
    public String articleListPage(@PathVariable(value = "pageIndex", required = false) String pageIndex, Model model) {
        if (StringUtils.isBlank(pageIndex)) {
            pageIndex = "1";
        }
        model.addAttribute("pageIndex", Integer.parseInt(pageIndex));
        return themeView("articleList.html");
    }

    @GetMapping(value = {"/article/{slug}"})
    @Operation(summary = "文章页")
    public String articlePage(@PathVariable(value = "slug", required = false) String slug, Model model) {
        ArticleRespVO articleRespVO = articleService.getBySlugAndTypeAndStatus(slug,
                ArticleConstant.ARTICLE_TYPE_ARTICLE, ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        if (articleRespVO != null) {
            model.addAttribute("article", articleRespVO);
        }
        return themeView("article.html");
    }
}
