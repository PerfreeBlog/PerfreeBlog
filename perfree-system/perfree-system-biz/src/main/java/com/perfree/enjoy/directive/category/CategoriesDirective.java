package com.perfree.enjoy.directive.category;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.constant.CategoryConstant;
import com.perfree.controller.auth.category.vo.CategoryListReqVO;
import com.perfree.controller.auth.category.vo.CategoryTreeRespVO;
import com.perfree.service.category.CategoryService;
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
        CategoryListReqVO reqVO = new CategoryListReqVO();
        reqVO.setStatus(CategoryConstant.STATUS_NORMAL);
        List<CategoryTreeRespVO> categoryTreeRespVOList = categoryService.listTree(reqVO);
        scope.set("categories", categoryTreeRespVOList);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
