package com.perfree.directive;

import cn.hutool.http.HtmlUtil;
import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.Constants;
import com.perfree.service.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("journalPage")
@Component
@SuppressWarnings("all")
public class JournalPageDirective extends BaseDirective {
    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        JournalPageDirective.articleService = articleService;
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

        String orderBy = getExprParamToStr("orderBy");
        if (StringUtils.isNotBlank(orderBy)){
            orderBy = HtmlUtil.filter(orderBy);
            query.put("orderBy", orderBy);
        }
        query.put("type", Constants.ARTICLE_TYPE_JOURNAL);
        articlePage.setForm(query);
        articlePage.setPageSize(getExprParamToInt("pageSize", 10));
        articlePage = articleService.frontArticlesPage(articlePage);
        articlePage.setUrlPrefix(url);
        articlePage.initPagers();

        scope.set("journalPage", articlePage);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
