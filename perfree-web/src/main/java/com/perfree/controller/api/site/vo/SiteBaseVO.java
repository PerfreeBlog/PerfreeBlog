package com.perfree.controller.api.site.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class SiteBaseVO {

    @Schema(description = "站点名称", name = "name")
    @NotBlank(message = "站点名称不允许为空")
    @Length(min = 2, max = 100, message = "站点名称长度要在2-100字符之间")
    private String name;

    @Schema(description = "站点描述", name = "description")
    @Length(max = 500, message = "站点描述长度要在500字符之间")
    private String description;

    @Schema(description = "站点标识", name = "flag")
    @NotBlank(message = "站点标识不允许为空")
    @Length(min = 2, max = 30, message = "站点标识长度要在2-30字符之间")
    private String flag;

    @Schema(description = "站点状态", name = "status")
    private Integer status;
}
