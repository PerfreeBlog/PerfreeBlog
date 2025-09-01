package com.perfree.controller.common.system.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

/**
 * @author Perfree
 * @description 初始化站点  Request VO
 * @date 15:36 2023/9/28
 */
@Schema(description = "初始化站点 Request VO")
@Data
public class InitWebReqVO {

    @Schema(description = "网站名称")
    @NotEmpty(message = "网站名称不能为空")
    private String webName;

    @Schema(description = "网站标题")
    @NotEmpty(message = "网站标题不能为空")
    private String webTitle;

    @Schema(description = "邮箱")
    @NotEmpty(message = "邮箱不能为空")
    private String email;

    @Schema(description = "昵称")
    @NotEmpty(message = "昵称不能为空")
    private String username;

    @Schema(description = "账户")
    @NotEmpty(message = "账户不能为空")
    private String account;

    @Schema(description = "密码")
    @NotEmpty(message = "密码不能为空")
    private String password;
}
