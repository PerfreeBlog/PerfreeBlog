package com.perfree.controller.api.option.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OptionBaseVO {

    @Schema(description = "配置key", name = "key")
    @NotBlank(message = "配置key不允许为空")
    private String key;

    @Schema(description = "配置value", name = "value")
    private String value;

    @Schema(description = "站点ID", name = "value")
    private Long siteId;
}
