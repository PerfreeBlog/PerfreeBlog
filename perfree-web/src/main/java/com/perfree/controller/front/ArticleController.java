package com.perfree.controller.front;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ArticleController extends BaseController {
    @Autowired
    private ArticleService articleService;

    @RequestMapping(value = {"/articleList/{pageIndex}", "/articleList"})
    public String articleListPage(@PathVariable(value = "pageIndex", required = false) String pageIndex,Model model) {
        model.addAttribute("url", Constants.URL_ARTICLE_LIST);
        if (StringUtils.isBlank(pageIndex)) {
            pageIndex = "1";
        }
        model.addAttribute("pageIndex", Integer.parseInt(pageIndex));
        return view(currentThemePage() + "/articleList.html");
    }

    @RequestMapping("/article/{slug}")
    public String articlePage(@PathVariable("slug") String slug,Model model, HttpServletRequest request) {
        if (slug.contains("-")) {
            String[] split = slug.split("-");
            slug = split[0];
            model.addAttribute("commentIndex", split[1]);
        }
        Article article = articleService.getBySlug(slug, Constants.ARTICLE_TYPE_ARTICLE);
        if (article != null) {
            articleService.cacheCount(article.getId().toString(), IpUtil.getIpAddr(request));
            model.addAttribute("articleId", article.getId());
            model.addAttribute("article", article);
            model.addAttribute(Constants.SEO_TITLE, StringUtils.isBlank(article.getTitle()) ? null : article.getTitle().trim());
            model.addAttribute(Constants.SEO_KEYWORD, StringUtils.isBlank(article.getMetaKeywords()) ? null : article.getMetaKeywords().trim());
            model.addAttribute(Constants.SEO_DESC, StringUtils.isBlank(article.getMetaDescription()) ? null : article.getMetaDescription().trim());
        }
        model.addAttribute("url", Constants.URL_ARTICLE + slug);
        return view(currentThemePage() + "/article.html");
    }

    @GetMapping("/article/like")
    public ResponseBean like(@RequestParam("articleId") Long articleId){
        articleService.updateGreatCount(articleId);
        return ResponseBean.success("success", null);
    }
}
