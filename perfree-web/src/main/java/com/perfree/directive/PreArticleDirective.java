package com.perfree.directive;

import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@TemplateDirective("preArticle")
@Component
public class PreArticleDirective extends Directive {

    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        PreArticleDirective.articleService = articleService;
    }


    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String articleId = "";
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (servletRequestAttributes == null) {
            return;
        }
        HttpServletRequest request = servletRequestAttributes.getRequest();
        Map urlPathVariables = (Map)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        if (urlPathVariables != null && urlPathVariables.size() > 0) {
            articleId = urlPathVariables.get("articleId").toString();
        }
        if (StringUtils.isBlank(articleId)) {
            return ;
        }
        Article article = articleService.getPreArticle(Long.valueOf(articleId));
        scope.set("article", article);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
