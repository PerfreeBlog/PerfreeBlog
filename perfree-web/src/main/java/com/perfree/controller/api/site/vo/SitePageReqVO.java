package com.perfree.controller.api.site.vo;

import com.perfree.commons.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "管理后台 - 多站点分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class SitePageReqVO extends PageParam {
    @Schema(description = "站点名称")
    private String name;

    @Schema(description = "站点标识")
    private String flag;
}
