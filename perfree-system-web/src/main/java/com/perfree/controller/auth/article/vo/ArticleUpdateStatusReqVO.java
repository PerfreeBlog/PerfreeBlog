package com.perfree.controller.auth.article.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Schema(description = "文章修改状态ReqVO")
@Data
public class ArticleUpdateStatusReqVO {

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "文章id不能为空")
    private Integer id;

    @Schema(description = "状态0:已发布,1:草稿", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "文章状态不能为空")
    private Integer status;
}
