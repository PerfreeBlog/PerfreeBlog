package com.perfree.controller.auth.comment.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "管理后台 - 评论分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CommentPageReqVO extends PageParam {

    @Schema(description = "评论内容")
    private String content;

    @Schema(description = "评论人")
    private String userName;

    @Schema(description = "文章id")
    private Integer articleId;
}
