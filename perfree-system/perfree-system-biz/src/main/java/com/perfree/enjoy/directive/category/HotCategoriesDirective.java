package com.perfree.enjoy.directive.category;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.constant.ViewConstant;
import com.perfree.controller.auth.category.vo.CategoryRespVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.service.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@TemplateDirective("hotCategories")
@Component
public class HotCategoriesDirective extends BaseDirective {

    private static CategoryService categoryService;

    @Autowired
    public void setCategoryService(CategoryService categoryService){
        HotCategoriesDirective.categoryService = categoryService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        HashMap<String, String> para = exprListToMap();
        int count = Integer.parseInt(para.get(ViewConstant.COUNT));
        List<CategoryRespVO> categoryRespVOList = categoryService.getHotCategory(count);
        scope.set("categories", categoryRespVOList);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
