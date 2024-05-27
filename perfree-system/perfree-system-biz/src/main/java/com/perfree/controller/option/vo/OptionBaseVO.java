package com.perfree.controller.option.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class OptionBaseVO {

    @Schema(description = "key" )
    private String key;

    @Schema(description = "value" )
    private String value;
}
