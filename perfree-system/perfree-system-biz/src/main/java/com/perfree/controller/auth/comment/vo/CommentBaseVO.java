package com.perfree.controller.auth.comment.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommentBaseVO {

    @Schema(description = "文章id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "文章id不能为空")
    private Integer articleId;

    @Schema(description = "父级id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "父级id不能为空")
    private Integer pid;

    @Schema(description = "顶层父级id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "顶层父级id不能为空")
    private Integer topPid;

    @Schema(description = "用户iD")
    private Integer userId;

    @Schema(description = "评论内容", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "评论内容不能为空")
    private String content;

    @Schema(description = "头像")
    private String avatar;

    @Schema(description = "网站地址")
    private String website;

    @Schema(description = "邮箱")
    private String email;

    @Schema(description = "评论人")
    private String userName;

    @Schema(description = "设备类型")
    private String device;

    @Schema(description = "ip")
    private String ip;
}
