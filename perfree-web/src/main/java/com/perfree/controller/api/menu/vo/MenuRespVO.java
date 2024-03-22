package com.perfree.controller.api.menu.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Schema(description = "菜单 Response VO")
@Data
public class MenuRespVO extends MenuBaseVO{
    @Schema(description = "主键")
    private String id;

    @Schema(description = "父级ID")
    private String pid;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;
}
