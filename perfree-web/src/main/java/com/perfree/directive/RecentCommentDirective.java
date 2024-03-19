package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Comment;
import com.perfree.service.CommentService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

/**
 * 最近回复
 */
@TemplateDirective("recentComment")
@Component
public class RecentCommentDirective extends BaseDirective {
    private static CommentService commentService;

    @Resource
    public void setCommentService(CommentService commentService){
        RecentCommentDirective.commentService = commentService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        HashMap<String, String> para = exprListToMap();
        int count = Integer.parseInt(para.get("count"));
        List<Comment> comments = commentService.getRecentComment(count);
        scope.set("comments", comments);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
