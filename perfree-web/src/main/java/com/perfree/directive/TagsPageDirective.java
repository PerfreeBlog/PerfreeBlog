package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.service.CategoryService;
import com.perfree.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("tagsPage")
@Component
public class TagsPageDirective extends BaseDirective{
    private static TagService tagService;

    @Autowired
    public void setArticleService(TagService tagService){
        TagsPageDirective.tagService = tagService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String url = getModelDataToStr("url", scope);
        DirectivePage<HashMap<String, String>> tagsPage = new DirectivePage<>();
        tagsPage.setPageIndex(getModelDataToInt("pageIndex", scope, 1));
        tagsPage.setPageSize(getExprParamToInt("pageSize", 10));
        tagsPage = tagService.frontTagsPage(tagsPage);
        tagsPage.setUrlPrefix(url);
        tagsPage.initPagers();

        scope.set("tagsPage", tagsPage);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
