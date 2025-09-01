package com.perfree.enjoy.directive.category;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.DirectivePageResult;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.commons.utils.DirectiveSortingUtils;
import com.perfree.constant.ViewConstant;
import com.perfree.controller.auth.category.vo.CategoryPageReqVO;
import com.perfree.controller.auth.category.vo.CategoryRespVO;
import com.perfree.service.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@TemplateDirective("categoriesPage")
@Component
public class CategoriesPageDirective extends BaseDirective {

    private static CategoryService categoryService;

    @Autowired
    public void setCategoryService(CategoryService categoryService){
        CategoriesPageDirective.categoryService = categoryService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        CategoryPageReqVO reqVO = new CategoryPageReqVO();
        // 组装来自ModelView的数据
        reqVO.setPageNo(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1));
        reqVO.setName(getModelDataToStr(ViewConstant.NAME, scope));

        // 组装来自指令编写的参数
        reqVO.setPageSize(getExprParamToInt(ViewConstant.PAGE_SIZE, 10));
        reqVO.setSortingFields(DirectiveSortingUtils.handleSortingField(getExprParamToStr(ViewConstant.ORDER_BY, null)));
        PageResult<CategoryRespVO> pageResult = categoryService.categoryPage(reqVO);
        // 组装结果集
        DirectivePageResult<CategoryRespVO> result = new DirectivePageResult<>(pageResult.getList(),pageResult.getTotal(),
                reqVO.getPageNo(), reqVO.getPageSize());
        scope.set("categoriesPage", result);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
