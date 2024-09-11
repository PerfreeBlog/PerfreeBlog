package com.perfree.enjoy.directive.commons;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@TemplateDirective("articleImage")
@Component
public class ArticleImageDirective extends BaseDirective {
    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String parseContent = getParam(0, scope).toString();
        List<String> imageSrc = getImageSrc(parseContent);
        scope.set("images", imageSrc);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }

    /**
     * 获取html上所有的图片路径
     * @param htmlCode htmlCode
     * @return List<String>
     */
    public static List<String> getImageSrc(String htmlCode) {
        List<String> imageSrcList = new ArrayList<String>();
        Pattern p = Pattern.compile("<img\\b[^>]*\\bsrc\\b\\s*=\\s*(['\"])?([^'\"\n\r\f>]+(\\.jpg|\\.bmp|\\.eps|\\.gif|\\.mif|\\.miff|\\.png|\\.tif|\\.tiff|\\.svg|\\.wmf|\\.jpe|\\.jpeg|\\.dib|\\.ico|\\.tga|\\.cut|\\.pic)\\b)[^>]*>", Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(htmlCode);
        String quote = null;
        String src = null;
        while (m.find()) {
            quote = m.group(1);
            src = (quote == null || quote.trim().isEmpty()) ? m.group(2).split("\\s+")[0] : m.group(2);
            imageSrcList.add(src);
        }
        return imageSrcList;
    }
}
