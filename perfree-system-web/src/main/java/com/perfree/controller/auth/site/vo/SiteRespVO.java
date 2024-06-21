package com.perfree.controller.auth.site.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Schema(description = "站点RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class SiteRespVO extends SiteBaseVO{

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;

    @Schema(description = "状态")
    private Integer status;

}
