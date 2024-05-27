package com.perfree.controller.user.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "管理后台 - 用户ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserUpdateReqVO extends UserBaseVO {
    @Schema(description = "id")
    private Integer id;

    @Schema(description = "用户登录密码")
    private String password;

}
