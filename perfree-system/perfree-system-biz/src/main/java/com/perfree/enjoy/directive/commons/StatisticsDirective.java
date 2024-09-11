package com.perfree.enjoy.directive.commons;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.service.article.ArticleService;
import com.perfree.service.category.CategoryService;
import com.perfree.service.comment.CommentService;
import com.perfree.service.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@TemplateDirective("statistics")
@Component
public class StatisticsDirective extends BaseDirective {

    private static ArticleService articleService;
    private static CommentService commentService;
    private static TagService tagService;

    private static CategoryService categoryService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        StatisticsDirective.articleService = articleService;
    }

    @Autowired
    public void setCommentService(CommentService commentService){
        StatisticsDirective.commentService = commentService;
    }

    @Autowired
    public void setCategoryService(CategoryService categoryService){
        StatisticsDirective.categoryService = categoryService;
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
        statistics.put("categoryCount", categoryService.getCategoryCount());
        statistics.put("journalCount", articleService.getJournalCount());
        scope.set("statistics", statistics);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
