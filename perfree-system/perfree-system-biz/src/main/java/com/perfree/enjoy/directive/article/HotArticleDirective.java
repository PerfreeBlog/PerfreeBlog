package com.perfree.enjoy.directive.article;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.service.article.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@TemplateDirective("hotArticle")
@Component
public class HotArticleDirective extends BaseDirective {

    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        HotArticleDirective.articleService = articleService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        HashMap<String, String> para = exprListToMap();
        int count = Integer.parseInt(para.get("count"));
        String type = para.get("type");
        List<ArticleRespVO> hotArticleList;
        if (StringUtils.isNotBlank(type) && type.equals("comment")) {
            hotArticleList = articleService.getHotArticleByCommentCount(count);
        } else if (StringUtils.isNotBlank(type) && type.equals("great")) {
            hotArticleList = articleService.getHotArticleByGreatCount(count);
        }else {
            hotArticleList = articleService.getHotArticleByViewCount(count);
        }
        scope.set("articles", hotArticleList);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }

}
