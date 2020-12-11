package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

    }
}
