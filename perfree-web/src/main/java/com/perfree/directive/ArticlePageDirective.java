package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.service.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("articlePage")
@Component
public class ArticlePageDirective extends BaseDirective {
    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        ArticlePageDirective.articleService = articleService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        HashMap<String, String> query = new HashMap<>();
        String url = getModelDataToStr("url", scope);
        DirectivePage<HashMap<String, String>> articlePage = new DirectivePage<>();
        articlePage.setPageIndex(getModelDataToInt("pageIndex", scope, 1));

        String tagId = getModelDataToStr("tagId", scope);
        if (StringUtils.isNotBlank(tagId)) {
            query.put("tagId", tagId);
        }

        String categoryId = getModelDataToStr("categoryId", scope);
        if (StringUtils.isNotBlank(categoryId)) {
            query.put("categoryId", categoryId);
        }

        articlePage.setForm(query);
        articlePage.setPageSize(getExprParamToInt("pageSize", 10));
        articlePage = articleService.frontArticlesPage(articlePage);
        articlePage.setUrlPrefix(url);
        articlePage.initPagers();

        scope.set("articlePage", articlePage);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
