package com.perfree.controller.auth.article.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Schema(description = "文章修改是否允许评论ReqVO")
@Data
public class ArticleUpdateIsCommentReqVO{

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "文章id不能为空")
    private Integer id;

    @Schema(description = "是否允许评论0:否,1是", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "是否允许评论不能为空")
    private Integer isComment;
}
