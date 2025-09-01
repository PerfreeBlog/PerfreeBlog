package com.perfree.enjoy.directive.article;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.constant.ArticleConstant;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.service.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@TemplateDirective("nextArticle")
@Component
public class NextArticleDirective extends BaseDirective {

    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        NextArticleDirective.articleService = articleService;
    }


    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        ArticleRespVO article = getModelDataToClass("article", scope, ArticleRespVO.class);
        if (null == article || null == article.getId()) {
            return ;
        }
        ArticleRespVO nextArticle = articleService.getNextArticle(article.getId(), ArticleConstant.ARTICLE_TYPE_ARTICLE, ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        scope.set("nextArticle", nextArticle);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
