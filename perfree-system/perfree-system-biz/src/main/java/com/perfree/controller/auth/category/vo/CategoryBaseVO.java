package com.perfree.controller.auth.category.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CategoryBaseVO {

    @Schema(description = "分类名", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "分类名不能为空")
    private String name;

    @Schema(description = "父级id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "父级id不能为空")
    private Integer pid;

    @Schema(description = "描述")
    private String desc;


    @Schema(description = "SEO关键字")
    private String metaKeywords;

    @Schema(description = "SEO描述内容")
    private String metaDescription;

    @Schema(description = "封面图")
    private String thumbnail;

    @Schema(description = "slug")
    private String slug;

}
