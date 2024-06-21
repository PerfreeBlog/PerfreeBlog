package com.perfree.controller.auth.comment.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Schema(description = "评论RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CommentRespVO extends CommentBaseVO {

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "状态:0正常,1:待审核")
    private Integer status;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;
}
