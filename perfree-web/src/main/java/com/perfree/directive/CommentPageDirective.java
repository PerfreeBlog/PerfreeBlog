package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Article;
import com.perfree.service.CommentService;
import org.apache.commons.lang3.StringUtils;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("commentPage")
@Component
public class CommentPageDirective extends BaseDirective{
    private static CommentService commentService;

    @Resource
    public void setArticleService(CommentService commentService){
        CommentPageDirective.commentService = commentService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        Integer commentIndex = getModelDataToInt("commentIndex", scope, 1);
        DirectivePage<HashMap<String, String>> commentPage = new DirectivePage<>();
        commentPage.setPageIndex(commentIndex);
        commentPage.setPageSize(getExprParamToInt("pageSize", 10));
        HashMap<String, String> query = new HashMap<>();
        String articleId = getModelDataToStr("articleId", scope);
        if (StringUtils.isBlank(articleId)) {
            Article article = (Article) getModelData("article", scope);
            articleId = article.getId().toString();
        }
        query.put("articleId", articleId);
        commentPage.setForm(query);
        commentPage = commentService.getCommentByArticleId(commentPage);
        String url = getModelDataToStr("url", scope);
        commentPage.setUrlPrefix(url + "-");
        commentPage.initPagers();

        scope.set("commentPage", commentPage);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
