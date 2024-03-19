package com.perfree.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;
import java.util.List;

/**
 * 定义归档实体类
 *
 * @author Perfree
 */
@Schema(description = "文章归档数据")
public class Archive implements Serializable {
    private static final long serialVersionUID = 4900274588193382136L;

    @Schema(description = "日期", name = "date", example = "2021年12月")
    private String date;

    @Schema(description = "文章数据", name = "articles")
    private List<Article> articles;


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }
}
