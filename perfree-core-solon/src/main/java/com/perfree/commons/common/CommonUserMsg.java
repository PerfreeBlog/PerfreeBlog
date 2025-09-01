package com.perfree.commons.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 通用的用户关联信息类
 */
@Data
public class CommonUserMsg {

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "昵称")
    private String userName;

    @Schema(description = "头像")
    private String avatar;

    @Schema(description = "邮箱")
    private String email;

    @Schema(description = "网站")
    private String website;
}
