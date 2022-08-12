package com.perfree.controller.front;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.FrontViewNodeRender;
import com.perfree.commons.IpUtil;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * @description 通用page
 * @author Perfree
 * @date 2021/12/6 11:10
 */
@Controller
public class PageController extends BaseController {

    @Autowired
    private ArticleService articleService;

    /**
     * @description  通用page页
     * @return java.lang.String
     * @author Perfree
     */
    @RequestMapping("/page/{slug}")
    @FrontViewNodeRender(isPageView = true)
    public String page(@PathVariable("slug") String slug, HttpServletRequest request, Model model) {
        if (slug.contains("-")) {
            String[] split = slug.split("-");
            slug = split[0];
            model.addAttribute("commentIndex", split[1]);
        }
        Article article = articleService.getBySlug(slug, Constants.ARTICLE_TYPE_PAGE);
        model.addAttribute("url", Constants.URL_PAGE + slug);
        if (article != null) {
            articleService.cacheCount(article.getId().toString(), IpUtil.getIpAddr(request));
            model.addAttribute("article", article);
            model.addAttribute(Constants.SEO_TITLE, StringUtils.isBlank(article.getTitle()) ? null : article.getTitle().trim());
            model.addAttribute(Constants.SEO_KEYWORD, StringUtils.isBlank(article.getMetaKeywords()) ? null : article.getMetaKeywords().trim());
            model.addAttribute(Constants.SEO_DESC, StringUtils.isBlank(article.getMetaDescription()) ? null : article.getMetaDescription().trim());
            if (StringUtils.isNotBlank(article.getTemplate())) {
                return pageView(article.getTemplate());
            }
        }
        return pageView(Constants.ARTICLE_TYPE_PAGE + Constants.SEPARATOR +  slug + ".html");
    }

    /**
     * 分页处理
     * @param pageIndex 页码
     * @param model model
     * @return String
     */
    @RequestMapping("/page/{slug}/{pageIndex}")
    public String pages(@PathVariable("slug") String slug,@PathVariable("pageIndex") int pageIndex, HttpServletRequest request, Model model) {
        if (slug.contains("-")) {
            String[] split = slug.split("-");
            slug = split[0];
            model.addAttribute("commentIndex", split[1]);
        }
        Article article = articleService.getBySlug(slug, Constants.ARTICLE_TYPE_PAGE);
        if (article != null) {
            articleService.cacheCount(article.getId().toString(), IpUtil.getIpAddr(request));
            model.addAttribute("article", article);
            model.addAttribute(Constants.SEO_TITLE, StringUtils.isBlank(article.getTitle()) ? null : article.getTitle().trim());
            model.addAttribute(Constants.SEO_KEYWORD, StringUtils.isBlank(article.getMetaKeywords()) ? null : article.getMetaKeywords().trim());
            model.addAttribute(Constants.SEO_DESC, StringUtils.isBlank(article.getMetaDescription()) ? null : article.getMetaDescription().trim());
        }
        model.addAttribute("url", Constants.URL_PAGE + slug);
        model.addAttribute("pageIndex", pageIndex);
        return pageView(Constants.ARTICLE_TYPE_PAGE + Constants.SEPARATOR +  slug + ".html");
    }
}
