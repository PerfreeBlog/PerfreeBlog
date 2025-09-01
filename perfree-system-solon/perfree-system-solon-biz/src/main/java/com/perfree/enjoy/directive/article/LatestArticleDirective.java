package com.perfree.enjoy.directive.article;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.service.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@TemplateDirective("latestArticle")
@Component
public class LatestArticleDirective extends BaseDirective {

    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        LatestArticleDirective.articleService = articleService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        HashMap<String, String> para = exprListToMap();
        int count = Integer.parseInt(para.get("count"));
        List<ArticleRespVO> latestArticle = articleService.getLatestArticle(count);
        scope.set("articles", latestArticle);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
