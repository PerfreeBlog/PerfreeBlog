package com.perfree.enjoy.directive.comment;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.controller.auth.comment.vo.CommentRespVO;
import com.perfree.service.comment.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@TemplateDirective("recentComment")
@Component
public class RecentCommentDirective extends BaseDirective {

    private static CommentService commentService;

    @Autowired
    public void setCommentService(CommentService commentService){
        RecentCommentDirective.commentService = commentService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        HashMap<String, String> para = exprListToMap();
        int count = Integer.parseInt(para.get("count"));
        List<CommentRespVO> latestComment = commentService.getLatestComment(count);
        scope.set("comments", latestComment);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
