package com.perfree.controller.auth.comment.vo;

import com.perfree.commons.common.CommonUserMsg;
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

    @Schema(description = "文章标题")
    private String articleTitle;

    @Schema(description = "文章slug")
    private String articleSlug;

    @Schema(description = "文章类型")
    private String articleType;

    @Schema(description = "子评论数量")
    private Integer childNum;

    @Schema(description = "用户信息(当userId不为空时)")
    private CommonUserMsg userInfo;
}
