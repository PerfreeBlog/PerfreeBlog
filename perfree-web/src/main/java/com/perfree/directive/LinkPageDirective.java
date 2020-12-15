package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.service.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("linkPage")
@Component
public class LinkPageDirective extends BaseDirective{
    private static LinkService linkService;

    @Autowired
    public void setArticleService(LinkService linkService){
        LinkPageDirective.linkService = linkService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }


    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String url = getModelDataToStr("url", scope);
        DirectivePage<HashMap<String, String>> linkPage = new DirectivePage<>();
        linkPage.setPageIndex(getModelDataToInt("pageIndex", scope, 1));
        linkPage.setPageSize(getExprParamToInt("pageSize", 10));
        linkPage = linkService.frontList(linkPage);
        linkPage.setUrlPrefix(url);
        linkPage.initPagers();

        scope.set("linkPage", linkPage);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
