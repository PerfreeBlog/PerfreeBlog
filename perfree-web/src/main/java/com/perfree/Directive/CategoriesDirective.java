package com.perfree.Directive;

import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.annotation.TemplateDirective;
import com.perfree.model.Category;
import com.perfree.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * option模板指令
 */
@TemplateDirective("categories")
@Component
public class CategoriesDirective extends Directive {

    private static CategoryService categoryService;

    @Autowired
    public void setCategoryService(CategoryService categoryService){
        CategoriesDirective.categoryService = categoryService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        List<Category> categories = categoryService.allList();
        scope.set("categories", categories);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
