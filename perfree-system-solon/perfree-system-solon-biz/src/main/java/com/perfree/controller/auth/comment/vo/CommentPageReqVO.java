package com.perfree.controller.auth.comment.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "评论分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CommentPageReqVO extends PageParam {

    @Schema(description = "评论内容")
    private String content;

    @Schema(description = "评论人")
    private String userName;

    @Schema(description = "文章id")
    private Integer articleId;

    @Schema(description = "文章标题")
    private String articleTitle;

    @Schema(description = "状态:0正常,1:待审核")
    private Integer status;

    @Schema(description = "类型")
    private String articleType;
}
