package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.common.Constants;
import com.perfree.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("commentPage")
@Component
public class CommentPageDirective extends BaseDirective{
    private static CommentService commentService;

    @Autowired
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
        query.put("articleId", articleId);
        commentPage.setForm(query);
        commentPage = commentService.getCommentByArticleId(commentPage);
        commentPage.setUrlPrefix(Constants.ARTICLE_ARTICLE + articleId + "-");
        commentPage.initPagers();

        scope.set("commentPage", commentPage);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
