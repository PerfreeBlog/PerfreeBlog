package com.perfree.mapper;

import com.perfree.model.Article;
import com.perfree.model.ArticleTag;
import com.perfree.model.Tag;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ArticleMapper {
    /**
     * 添加文章
     * @param article article
     * @return int
     */
    int add(Article article);

    /**
     * 关联文章和标签
     * @param articleTags articleTags
     */
    void addArticleTag(List<ArticleTag> articleTags);
}
