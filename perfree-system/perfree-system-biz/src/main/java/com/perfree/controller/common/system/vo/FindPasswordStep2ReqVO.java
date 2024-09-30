package com.perfree.controller.common.system.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Schema(description = "找回密码步骤2 Request VO")
@Data
public class FindPasswordStep2ReqVO {


    @Schema(description = "账号")
    @NotBlank(message = "账号不能为空")
    @Size(min = 5, max = 16, message = "账户必须在5-16字之间")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "账号格式为数字以及字母")
    private String account;

    @Schema(description = "邮箱验证码")
    @NotBlank(message = "邮箱验证码不能为空")
    private String findPasswordCode;

    @Schema(description = "新密码", example = "123456")
    @NotEmpty(message = "新密码不能为空")
    private String newPassword;

    @Schema(description = "验证码uuid", example = "123456")
    private String uuid;

    @Schema(description = "验证码", example = "123456")
    private String code;

}
