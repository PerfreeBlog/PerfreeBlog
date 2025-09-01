package com.perfree.controller.auth.tag.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TagBaseVO {

    @Schema(description = "标签名", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "标签名不能为空")
    private String name;

    @Schema(description = "颜色")
    private String color;

    @Schema(description = "缩略图")
    private String thumbnail;

    @Schema(description = "slug")
    private String slug;
}
