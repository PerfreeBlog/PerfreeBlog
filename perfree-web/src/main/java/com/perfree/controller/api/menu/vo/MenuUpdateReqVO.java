package com.perfree.controller.api.menu.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Schema(description = "菜单 update req VO")
@Data
public class MenuUpdateReqVO extends MenuBaseVO{
    @Schema(description = "父级ID")
    private String pid;

    @Schema(description = "ID")
    private String id;
}
