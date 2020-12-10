package com.perfree.directive;

import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Article;
import com.perfree.model.Tag;
import com.perfree.service.ArticleService;
import com.perfree.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@TemplateDirective("hotTag")
@Component
public class HotTagDirective extends Directive {
    private static TagService tagService;

    @Autowired
    public void setTagService(TagService tagService){
        HotTagDirective.tagService = tagService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        HashMap<String, String> para = DirectiveUtil.exprListToMap(exprList);
        int count = Integer.parseInt(para.get("count"));
        List<Tag> tags = tagService.getHotTag(count);
        scope.set("tags", tags);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
