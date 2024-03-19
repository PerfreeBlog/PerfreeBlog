package com.perfree.model;

/**
 * p_article_tag table
 * @author Perfree
 */
public class ArticleTag {
    private Long articleId;
    private Long tagId;

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }
}
