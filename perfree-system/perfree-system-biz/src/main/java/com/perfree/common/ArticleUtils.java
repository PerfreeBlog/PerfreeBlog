package com.perfree.common;

import com.perfree.commons.constant.SystemConstants;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.ui.Model;

public class ArticleUtils {

    public static void handleArticleModelAttribute(Model model, ArticleRespVO articleRespVO) {
        if (articleRespVO != null) {
            model.addAttribute("article", articleRespVO);
            model.addAttribute(SystemConstants.RENDER_PAGE_SEO_TITLE, StringUtils.isBlank(articleRespVO.getTitle()) ? null : articleRespVO.getTitle().trim());
            model.addAttribute(SystemConstants.RENDER_PAGE_SEO_KEYWORD, StringUtils.isBlank(articleRespVO.getMetaKeywords()) ? null : articleRespVO.getMetaKeywords().trim());
            model.addAttribute(SystemConstants.RENDER_PAGE_SEO_DESC, StringUtils.isBlank(articleRespVO.getMetaDescription()) ? null : articleRespVO.getMetaDescription().trim());
        }
    }
}
