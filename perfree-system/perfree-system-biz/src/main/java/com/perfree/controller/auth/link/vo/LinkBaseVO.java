package com.perfree.controller.auth.link.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LinkBaseVO {

    @Schema(description = "网站名", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "网站名不能为空")
    private String name;

    @Schema(description = "网站logo")
    private String logo;

    @Schema(description = "网站描述")
    private String desc;

    @Schema(description = "网站地址", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "网站地址不能为空")
    private String address;
}
