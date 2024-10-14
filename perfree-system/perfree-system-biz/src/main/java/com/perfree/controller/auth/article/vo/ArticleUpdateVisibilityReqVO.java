package com.perfree.controller.auth.article.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Schema(description = "文章修改是否可见ReqVO")
@Data
public class ArticleUpdateVisibilityReqVO {

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "文章id不能为空")
    private Integer id;

    @Schema(description = "是否可见", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "是否可见不能为空")
    private Integer visibility;
}
