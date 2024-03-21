package com.perfree.controller.api.user.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class UserBaseVO {

    @Schema(description = "账户", name = "account")
    @NotBlank(message = "账户不允许为空")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "账户只能填写字母或数字")
    @Length(min = 3, max = 12, message = "账户长度要在3-12字符之间")
    private String account;

    @Schema(description = "用户名", name = "userName")
    @NotBlank(message = "用户名不允许为空")
    @Length(min = 2, max = 16, message = "用户名长度要在2-16字符之间")
    private String userName;

    @Schema(description = "状态", name = "status", example = "0正常,1禁用")
    private Integer status;

    @Schema(description = "头像", name = "avatar")
    private String avatar;

    @Schema(description = "角色id", name = "roleId")
    private Long roleId;

    @Schema(description = "网址", name = "website")
    private String website;

    @Schema(description = "邮箱", name = "email")
    @NotBlank(message = "邮箱不允许为空")
    @Email(message = "请正确填写邮箱")
    private String email;
}
