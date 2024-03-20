package com.perfree.vo.system;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Schema(description = "用户 登录请求 VO")
public class UserLoginReqVO {

    @Schema(description = "账户", name = "account")
    @NotBlank(message = "账户不允许为空")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "账户只能填写字母或数字")
    @Length(min = 3, max = 30, message = "账户长度要在3-30字符之间")
    private String account;

    @Schema(description = "密码", name = "password")
    @NotEmpty(message = "密码不能为空")
    private String password;

    @Schema(description = "验证码uuid", example = "123456")
    private String uuid;

    @Schema(description = "验证码", example = "123456")
    private String code;
}
