package com.perfree.controller.auth.site.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SiteBaseVO {

    @Schema(description = "站点名", requiredMode = Schema.RequiredMode.REQUIRED, example = "测试")
    @NotBlank(message = "站点名不能为空")
    private String siteName;


    @Schema(description = "站点描述")
    private String siteDesc;


    @Schema(description = "站点访问标识", requiredMode = Schema.RequiredMode.REQUIRED, example = "测试")
    @NotBlank(message = "站点访问标识不能为空")
    private String siteSlug;
}
