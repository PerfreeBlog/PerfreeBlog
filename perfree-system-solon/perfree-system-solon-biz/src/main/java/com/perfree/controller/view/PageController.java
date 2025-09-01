package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import com.perfree.common.ArticleUtils;
import com.perfree.commons.annotation.FrontViewNodeRender;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.constant.ArticleConstant;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.noear.solon.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "通用page页面相关")
@Controller
public class PageController extends BaseViewController {

    @Inject
    private ArticleService articleService;

    @Get
    @Mapping(value = "/page/{slug}")
    @FrontViewNodeRender(isPageView = true)
    public String slugPage(@Path("slug") String slug, @Path(value = "pageIndex", required = false) Integer pageIndex, Model model,
                           HttpServletRequest request, HttpServletResponse response) {
        ArticleRespVO articleRespVO = articleService.getBySlugAndTypeAndStatus(slug, ArticleConstant.ARTICLE_TYPE_PAGE, ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        model.addAttribute("url", SystemConstants.URL_PAGE + slug);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        ArticleUtils.handleArticleModelAttribute(model, articleRespVO);
        if (articleRespVO != null) {
            articleService.viewCountHandle(request, response, articleRespVO.getId());
            if (StringUtils.isNotBlank(articleRespVO.getTemplate()) && !articleRespVO.getTemplate().equals("default")) {
                return themeView(articleRespVO.getTemplate());
            }
        }
        if (themeFileExist(ArticleConstant.ARTICLE_TYPE_PAGE + SystemConstants.FILE_SEPARATOR +  slug + ".html")) {
            return themeView(ArticleConstant.ARTICLE_TYPE_PAGE + SystemConstants.FILE_SEPARATOR +  slug + ".html");
        }
        return themeView(ArticleConstant.ARTICLE_TYPE_PAGE + ".html");
    }

    @Get
    @Mapping(value = "/page/{slug}/{pageIndex}")
    @FrontViewNodeRender(isPageView = true)
    public String page(@Path("slug") String slug, @Path(value = "pageIndex", required = false) Integer pageIndex, Model model,
                       HttpServletRequest request, HttpServletResponse response) {
        ArticleRespVO articleRespVO = articleService.getBySlugAndTypeAndStatus(slug, ArticleConstant.ARTICLE_TYPE_PAGE, ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        model.addAttribute("url", SystemConstants.URL_PAGE + slug);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        ArticleUtils.handleArticleModelAttribute(model, articleRespVO);
        if (articleRespVO != null) {
            articleService.viewCountHandle(request, response, articleRespVO.getId());
            if (StringUtils.isNotBlank(articleRespVO.getTemplate()) && !articleRespVO.getTemplate().equals("default")) {
                return themeView(articleRespVO.getTemplate());
            }
        }
        if (themeFileExist(ArticleConstant.ARTICLE_TYPE_PAGE + SystemConstants.FILE_SEPARATOR +  slug + ".html")) {
            return themeView(ArticleConstant.ARTICLE_TYPE_PAGE + SystemConstants.FILE_SEPARATOR +  slug + ".html");
        }
        return themeView(ArticleConstant.ARTICLE_TYPE_PAGE + ".html");
    }
}
