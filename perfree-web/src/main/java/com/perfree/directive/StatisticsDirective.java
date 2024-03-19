package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import com.perfree.service.TagService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("statistics")
@Component
public class StatisticsDirective  extends BaseDirective {

    private static ArticleService articleService;
    private static CommentService commentService;
    private static TagService tagService;

    @Resource
    public void setArticleService(ArticleService articleService){
        StatisticsDirective.articleService = articleService;
    }

    @Resource
    public void setCommentService(CommentService commentService){
        StatisticsDirective.commentService = commentService;
    }

    @Resource
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
