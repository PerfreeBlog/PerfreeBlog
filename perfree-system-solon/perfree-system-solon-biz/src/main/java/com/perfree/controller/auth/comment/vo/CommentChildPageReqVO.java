package com.perfree.controller.auth.comment.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "评论分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CommentChildPageReqVO extends PageParam {

    @Schema(description = "id")
    private Integer id;
}
