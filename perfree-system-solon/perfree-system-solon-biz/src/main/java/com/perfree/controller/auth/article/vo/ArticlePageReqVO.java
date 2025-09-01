package com.perfree.controller.auth.article.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "文章分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ArticlePageReqVO extends PageParam {
    @Schema(description = "文章标题")
    private String title;

    @Schema(description = "文章类型:article文章,page页面")
    private String type;

    @Schema(description = "分类ID")
    private Integer categoryId;

    @Schema(description = "分类slug")
    private String categorySlug;

    @Schema(description = "标签ID")
    private Integer tagId;

    @Schema(description = "标签slug")
    private String tagSlug;

    @Schema(description = "状态0:已发布,1:草稿")
    private Integer status;


    @Schema(description = "是否可见")
    private Integer visibility;

    @Schema(description = "文章标识")
    private String flag;
}
