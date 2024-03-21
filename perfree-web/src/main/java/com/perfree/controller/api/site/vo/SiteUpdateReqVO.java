package com.perfree.controller.api.site.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "管理后台 - 站点更新ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class SiteUpdateReqVO extends SiteBaseVO {
    @Schema(description = "id")
    private Integer id;
}
