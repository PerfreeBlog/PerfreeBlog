package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "通用page页面相关")
@Controller
public class PageController extends BaseViewController {

    @Resource
    private ArticleService articleService;

    @GetMapping(value = {"/page/{slug}", "/page/{slug}/{pageIndex}"})
    @FrontViewNodeRender(isPageView = true)
    public String page(@PathVariable("slug") String slug, @PathVariable(value = "pageIndex", required = false) Integer pageIndex, Model model,
                       HttpServletRequest request, HttpServletResponse response) {
        ArticleRespVO articleRespVO = articleService.getBySlugAndTypeAndStatus(slug, ArticleConstant.ARTICLE_TYPE_PAGE, ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        model.addAttribute("url", SystemConstants.URL_PAGE + slug);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        if (articleRespVO != null) {
            model.addAttribute("article", articleRespVO);
            model.addAttribute(SystemConstants.RENDER_PAGE_SEO_TITLE, StringUtils.isBlank(articleRespVO.getTitle()) ? null : articleRespVO.getTitle().trim());
            model.addAttribute(SystemConstants.RENDER_PAGE_SEO_KEYWORD, StringUtils.isBlank(articleRespVO.getMetaKeywords()) ? null : articleRespVO.getMetaKeywords().trim());
            model.addAttribute(SystemConstants.RENDER_PAGE_SEO_DESC, StringUtils.isBlank(articleRespVO.getMetaDescription()) ? null : articleRespVO.getMetaDescription().trim());
            articleService.viewCountHandle(request, response, articleRespVO.getId());
            if (StringUtils.isNotBlank(articleRespVO.getTemplate())) {
                return themeView(articleRespVO.getTemplate());
            }
        }
        return themeView(SystemConstants.FILE_SEPARATOR + ArticleConstant.ARTICLE_TYPE_PAGE + SystemConstants.FILE_SEPARATOR +  slug + ".html");
    }
}
