package com.perfree.directive;

import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import com.perfree.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("statistics")
@Component
public class StatisticsDirective  extends Directive {

    private static ArticleService articleService;
    private static CommentService commentService;
    private static TagService tagService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        StatisticsDirective.articleService = articleService;
    }

    @Autowired
    public void setCommentService(CommentService commentService){
        StatisticsDirective.commentService = commentService;
    }

    @Autowired
    public void setTagService(TagService tagService){
        StatisticsDirective.tagService = tagService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        HashMap<String,Long> statistics = new HashMap<>();
        statistics.put("articleCount", articleService.getArticleCount());
        statistics.put("commentCount", commentService.getCommentCount());
        statistics.put("tagCount", tagService.getTagCount());
        scope.set("statistics", statistics);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
