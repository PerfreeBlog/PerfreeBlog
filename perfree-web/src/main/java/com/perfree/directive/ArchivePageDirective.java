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

@TemplateDirective("archivePage")
@Component
public class ArchivePageDirective extends BaseDirective{
    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        ArchivePageDirective.articleService = articleService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String url = getModelDataToStr("url", scope);
        DirectivePage<HashMap<String, String>> articlePage = new DirectivePage<>();
        articlePage.setPageIndex(getModelDataToInt("pageIndex", scope, 1));
        HashMap<String, String> para = exprListToMap();
        String pageSize = para.get("pageSize");
        if (StringUtils.isBlank(pageSize)) {
            articlePage.setPageSize(10);
        } else {
            articlePage.setPageSize(Integer.parseInt(para.get("pageSize")));
        }
        articlePage = articleService.frontArchivePage(articlePage);
        articlePage.setUrlPrefix(url);
        articlePage.initPagers();

        scope.set("archivePage", articlePage);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
