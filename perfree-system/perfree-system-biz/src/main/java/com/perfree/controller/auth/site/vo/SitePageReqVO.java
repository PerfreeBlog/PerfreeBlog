package com.perfree.controller.auth.site.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "管理后台 - 站点分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class SitePageReqVO extends PageParam {
    @Schema(description = "站点名")
    private String siteName;
}
