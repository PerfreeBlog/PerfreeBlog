package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import org.apache.commons.lang3.StringUtils;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

@TemplateDirective("nextArticle")
@Component
public class NextArticleDirective extends BaseDirective {

    private static ArticleService articleService;

    @Resource
    public void setArticleService(ArticleService articleService){
        NextArticleDirective.articleService = articleService;
    }


    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String articleId = getModelData("articleId", scope).toString();
        if (StringUtils.isBlank(articleId)) {
            return ;
        }
        Article article = articleService.getNextArticle(Long.valueOf(articleId));
        scope.set("nextArticle", article);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
