package com.perfree.directive;

import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.Assign;
import com.jfinal.template.expr.ast.Expr;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Article;
import com.perfree.model.Menu;
import com.perfree.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 热门文章
 */
@TemplateDirective("hotArticle")
@Component
public class HotArticleDirective extends Directive {
    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        HotArticleDirective.articleService = articleService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        System.out.println(exprList);
        Expr[] exprArray = exprList.getExprArray();
        System.out.println(exprList.getExpr(0).toString());
        for (Expr expr : exprArray) {
            Assign assign = (Assign) expr;
            System.out.println(assign.getId());
            System.out.println(assign.getRight());
        }
        List<Article> articles = articleService.getHotArticle();
        scope.set("articles", articles);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
