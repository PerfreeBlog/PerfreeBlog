package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * pages模板指令
 */
@TemplateDirective("pages")
@Component
public class PagesDirective extends BaseDirective {

    private static ArticleService articleService;

    @Resource
    public void setCategoryService(ArticleService articleService){
        PagesDirective.articleService = articleService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        List<Article> pages = articleService.getPageList();
        scope.set("pages", pages);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
