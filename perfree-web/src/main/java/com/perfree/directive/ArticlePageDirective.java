package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.common.Constants;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

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
        String url = Constants.ARTICLE_LIST;
        DirectivePage<HashMap<String, String>> articlePage = new DirectivePage<>();
        articlePage.setPageIndex(getModelDataToInt("pageIndex", scope, 1));

        String tagId = getModelDataToStr("tagId", scope);
        if (StringUtils.isNotBlank(tagId)) {
            query.put("tagId", tagId);
            url = Constants.ARTICLE_TAG + tagId + "/";
        }

        String categoryId = getModelDataToStr("categoryId", scope);
        if (StringUtils.isNotBlank(categoryId)) {
            query.put("categoryId", categoryId);
            url = Constants.ARTICLE_CATEGORY + categoryId  + "/";
        }

        articlePage.setForm(query);
        HashMap<String, String> para = exprListToMap();
        String pageSize = para.get("pageSize");
        if (StringUtils.isBlank(pageSize)) {
            articlePage.setPageSize(10);
        } else {
            articlePage.setPageSize(Integer.parseInt(para.get("pageSize")));
        }
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
