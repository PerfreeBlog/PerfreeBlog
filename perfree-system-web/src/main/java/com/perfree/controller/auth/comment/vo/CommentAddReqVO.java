package com.perfree.controller.auth.comment.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "管理后台 - 评论添加ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CommentAddReqVO extends CommentBaseVO {

}
