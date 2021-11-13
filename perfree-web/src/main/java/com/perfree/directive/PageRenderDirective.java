package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.List;

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
            StringBuilder pageHtml = new StringBuilder();
            // 如果总页数小于要显示的页数,则全部显示
            if (param.getPagers().size() <= 5) {
                for (int i = 0;i< param.getPagers().size();i++) {
                    generateHtml(param.getPagers(), i, anchor, pageHtml);
                }
            } else {
                // 当前页小于5，加载1-4页
                if (param.getPageIndex() < 5) {
                    for (int i = 0; i < 5; i++) {
                        generateHtml(param.getPagers(), i, anchor, pageHtml);
                    }
                    // 最后一页追加“...”代表省略的页
                    if (param.getPageIndex() <= param.getPagers().size() - 2) {
                        pageHtml.append("<a class='m-pager disabled' href='javascript:;'>...</a>");
                        generateHtml(param.getPagers(), param.getPagers().size() - 1, anchor, pageHtml);
                    }
                } else {
                    // 当前页大于5页,1页码始终显示
                    generateHtml(param.getPagers(), 0, anchor, pageHtml);

                    pageHtml.append("<a class='m-pager disabled' href='javascript:;'>...</a>");

                    for (int i = 3; i >0; i--) {
                        generateHtml(param.getPagers(), param.getPageIndex() - i, anchor, pageHtml);
                    }

                    if (param.getPageIndex() + 2 >= param.getPagers().size()) {
                        for(int i = param.getPageIndex(); i <= param.getPagers().size() -1; i++){
                            generateHtml(param.getPagers(), i, anchor, pageHtml);
                        }
                    } else {
                        generateHtml(param.getPagers(), param.getPageIndex(), anchor, pageHtml);
                        pageHtml.append("<a class='m-pager disabled' href='javascript:;'>...</a>");
                        generateHtml(param.getPagers(), param.getPagers().size() - 1, anchor, pageHtml);
                    }
                }
            }
            String preUrl = StringUtils.isBlank(param.getPreUrl()) ? "javascript:;" : param.getPreUrl() + anchor;
            String nextUrl = StringUtils.isBlank(param.getNextUrl()) ? "javascript:;" : param.getNextUrl() + anchor;
            preText = StringUtils.isBlank(preText) ? "<" : preText;
            nextText = StringUtils.isBlank(nextText) ? ">" : nextText;
            String html = String.format(pagerHtmlFormat, param.getPreUrlStyle(),
                    preUrl,preText, pageHtml.toString(), param.getNextUrlStyle(), nextUrl,nextText);
            write(writer, html);
        }

    }


    private void generateHtml(List<Pager> pagers, int index, String anchor,StringBuilder pageHtml) {
        String pageHtmlFormat = "<a class='m-pager %s' href='%s'>%s</a>";
        String url = StringUtils.isBlank(pagers.get(index).getUrl()) ? "javascript:;" : pagers.get(index).getUrl() + anchor;
        String format = String.format(pageHtmlFormat, pagers.get(index).getStyle(), url, pagers.get(index).getText());
        pageHtml.append(format);
    }
}
