package com.perfree.controller.auth.article.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Schema(description = "文章修改是否置顶ReqVO")
@Data
public class ArticleUpdateIsTopReqVO {

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "文章id不能为空")
    private Integer id;

    @Schema(description = "是否置顶0:否,1:是", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "是否置顶不能为空")
    private Integer isTop;
}
