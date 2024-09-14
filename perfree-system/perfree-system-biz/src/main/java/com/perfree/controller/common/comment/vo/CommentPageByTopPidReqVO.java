package com.perfree.controller.common.comment.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "评论分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CommentPageByTopPidReqVO extends PageParam {

    @Schema(description = "topPid")
    @NotNull(message = "topPid不能为空")
    private Integer topPid;
}
