package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
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
public class CategoriesDirective extends BaseDirective {

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
        Category category = new Category();
        category.setStatus(0);
        List<Category> categories = categoryService.getFrontAllList(category);
        scope.set("categories", categories);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
