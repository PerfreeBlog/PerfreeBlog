package com.perfree.controller.auth.comment.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Schema(description = "修改评论状态ReqVO")
@Data
public class CommentUpdateStatusReqVO {

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "评论id不能为空")
    private Integer id;

    @Schema(description = "状态0:正常,1:待审核", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "状态不能为空")
    private Integer status;
}
