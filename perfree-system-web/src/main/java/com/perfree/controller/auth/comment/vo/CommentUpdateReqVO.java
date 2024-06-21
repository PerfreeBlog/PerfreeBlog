package com.perfree.controller.auth.comment.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "评论更新ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CommentUpdateReqVO extends CommentBaseVO {

    @Schema(description = "评论ID", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "评论ID不能为空")
    private Integer id;


}
