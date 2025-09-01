package com.perfree.controller.common.system.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

@Schema(description = "找回密码步骤1 Request VO")
@Data
public class FindPasswordStep1ReqVO {


    @Schema(description = "账号")
    @NotBlank(message = "账号不能为空")
    @Size(min = 5, max = 16, message = "账户必须在5-16字之间")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "账号格式为数字以及字母")
    private String account;

    @Schema(description = "邮箱")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Schema(description = "验证码uuid", example = "123456")
    private String uuid;

    @Schema(description = "验证码", example = "123456")
    private String code;

}
