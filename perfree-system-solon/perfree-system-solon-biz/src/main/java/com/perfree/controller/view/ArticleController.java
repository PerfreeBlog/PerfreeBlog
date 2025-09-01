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
import org.noear.solon.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "文章页相关")
@Controller
public class ArticleController  extends BaseViewController {

    @Inject
    private ArticleService articleService;

    @Get
    @Mapping(value = "/article")
    @Operation(summary = "文章列表页")
    @FrontViewNodeRender
    public String article(@Path(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("articleList.html");
    }

    @Get
    @Mapping(value = "/articleList")
    @Operation(summary = "文章列表页")
    @FrontViewNodeRender
    public String articleList(@Path(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("articleList.html");
    }

    @Get
    @Mapping(value = "/articleList/{pageIndex}")
    @Operation(summary = "文章列表页")
    @FrontViewNodeRender
    public String articleListPage(@Path(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("articleList.html");
    }

    @Get
    @Mapping("/article/{slug}")
    @Operation(summary = "文章页")
    @FrontViewNodeRender
    public String articlePage(@Path(value = "slug", required = false) String slug, Model model,
                              HttpServletRequest request, HttpServletResponse response) {
        ArticleRespVO articleRespVO = articleService.getBySlugAndTypeAndStatus(slug, ArticleConstant.ARTICLE_TYPE_ARTICLE, ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        ArticleUtils.handleArticleModelAttribute(model, articleRespVO);
        if (articleRespVO != null) {
            articleService.viewCountHandle(request, response, articleRespVO.getId());
        }
        return themeView("article.html");
    }

    @Get
    @Mapping(value = "/archive")
    @FrontViewNodeRender
    @Operation(summary = "文章归档页")
    public String index( @Path(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        model.addAttribute("url",  SystemConstants.URL_ARCHIVE);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("archive.html");
    }

    @Get
    @Mapping(value = "/archive/{pageIndex}")
    @FrontViewNodeRender
    @Operation(summary = "文章归档页")
    public String indexPage( @Path(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        model.addAttribute("url",  SystemConstants.URL_ARCHIVE);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("archive.html");
    }

    @Get
    @Mapping("/article/search")
    @FrontViewNodeRender
    public String searchListPage(@Path(value = "pageIndex", required = false) Integer pageIndex, @Param("title") String title, Model model) {
        model.addAttribute("url", SystemConstants.URL_ARTICLE_SEARCH);
        model.addAttribute("title", title);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("search.html");
    }
    @Get
    @Mapping("/article/search/{pageIndex}")
    @FrontViewNodeRender
    public String searchListPageIndex(@Path(value = "pageIndex", required = false) Integer pageIndex, @Param("title") String title, Model model) {
        model.addAttribute("url", SystemConstants.URL_ARTICLE_SEARCH);
        model.addAttribute("title", title);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("search.html");
    }
}
