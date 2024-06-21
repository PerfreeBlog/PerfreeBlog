package com.perfree.enjoy.directive.article.vo;

import lombok.Data;

@Data
public class ArticlePageDirectiveVo {

    private Integer pageIndex;

    private Integer pageSize;

    private Integer tagId;

    private Integer categoryId;

    private String title;

    private String orderBy;

    private String type;

}
