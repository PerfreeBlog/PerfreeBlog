package com.perfree.controller.api.menu.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Schema(description = "菜单 create req VO")
@Data
public class MenuCreateReqVO extends MenuBaseVO{
    @Schema(description = "父级ID")
    private String pid;
}
