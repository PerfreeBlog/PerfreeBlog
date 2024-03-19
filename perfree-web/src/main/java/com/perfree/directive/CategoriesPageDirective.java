package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.service.CategoryService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("categoriesPage")
@Component
public class CategoriesPageDirective extends BaseDirective{
    private static CategoryService categoryService;

    @Resource
    public void setArticleService(CategoryService categoryService){
        CategoriesPageDirective.categoryService = categoryService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String url = getModelDataToStr("url", scope);
        DirectivePage<HashMap<String, String>> categoriesPage = new DirectivePage<>();
        categoriesPage.setPageIndex(getModelDataToInt("pageIndex", scope, 1));
        categoriesPage.setPageSize(getExprParamToInt("pageSize", 10));
        categoriesPage = categoryService.frontCategoryPage(categoriesPage);
        categoriesPage.setUrlPrefix(url);
        categoriesPage.initPagers();

        scope.set("categoriesPage", categoriesPage);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
