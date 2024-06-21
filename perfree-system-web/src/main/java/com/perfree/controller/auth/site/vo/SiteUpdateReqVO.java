package com.perfree.controller.auth.site.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "站点更新ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class SiteUpdateReqVO extends SiteBaseVO{

    @Schema(description = "站点ID", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "站点ID不能为空")
    private Integer id;


}
