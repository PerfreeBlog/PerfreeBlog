package com.perfree.controller.auth.article.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ArticleBaseVO {

    @Schema(description = "文章标题", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "文章标题不能为空")
    private String title;

    @Schema(description = "文章内容", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "文章内容不能为空")
    private String content;

    @Schema(description = "文章内容类型:html/markdown", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "文章内容类型不能为空")
    private String contentModel;

    @Schema(description = "解析后的文章内容", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "解析后的文章内容不能为空")
    private String parseContent;

    @Schema(description = "文章类型:article文章,page页面", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "文章类型不能为空")
    private String type;

    @Schema(description = "文章摘要")
    private String summary;

    @Schema(description = "SEO关键字")
    private String metaKeywords;

    @Schema(description = "SEO描述")
    private String metaDescription;

    @Schema(description = "封面")
    private String thumbnail;

    @Schema(description = "slug")
    private String slug;

    @Schema(description = "文章类型: 0默认, 1置顶", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "文章类型不能为空")
    private Integer articleType;

    @Schema(description = "是否允许评论0:否,1是", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "是否允许评论不能为空")
    private Integer isComment;

    @Schema(description = "标识")
    private String flag;

    @Schema(description = "模板")
    private String template;
}