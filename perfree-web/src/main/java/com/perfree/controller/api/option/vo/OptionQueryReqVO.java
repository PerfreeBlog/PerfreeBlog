package com.perfree.controller.api.option.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "管理后台 - 配置查询req VO")
@Data
public class OptionQueryReqVO {

    @Schema(description = "keys", name = "keys")
    private List<String> keys;

    @Schema(description = "siteId", name = "siteId")
    private Long siteId;
}
