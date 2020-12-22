package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.common.MarkdownUtil;
import com.perfree.common.Pager;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("pageRender")
@Component
public class PageRenderDirective extends BaseDirective {
    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }
    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        DirectivePage<?> param = (DirectivePage<?>) getParam(0, scope);
        String anchor = getExprParamToStr("anchor");
        String preText = getExprParamToStr("preText");
        String nextText = getExprParamToStr("nextText");
        if (param != null && param.getPagers() != null) {
            String pagerHtmlFormat = "<nav class='m-pager-box'>" +
                    "<a class='m-pager %s' href='%s'>%s</a>"+
                    "%s"+
                    "<a class='m-pager %s' href='%s'>%s</a>"+
                    " </nav>";
            String pageHtmlFormat = "<a class='m-pager %s' href='%s'>%s</a>";
            StringBuilder pageHtml = new StringBuilder();
            param.getPagers().forEach(r -> {
                String url = StringUtils.isBlank( r.getUrl()) ? "javascript:;" : r.getUrl() + anchor;
                String format = String.format(pageHtmlFormat, r.getStyle(), url, r.getText());
                pageHtml.append(format);
            });
            String preUrl = StringUtils.isBlank(param.getPreUrl()) ? "javascript:;" : param.getPreUrl() + anchor;
            String nextUrl = StringUtils.isBlank(param.getNextUrl()) ? "javascript:;" : param.getNextUrl() + anchor;
            preText = StringUtils.isBlank(preText) ? "<" : preText;
            nextText = StringUtils.isBlank(nextText) ? ">" : nextText;
            String html = String.format(pagerHtmlFormat, param.getPreUrlStyle(),
                    preUrl,preText, pageHtml.toString(), param.getNextUrlStyle(), nextUrl,nextText);
            write(writer, html);
        }

    }
}
