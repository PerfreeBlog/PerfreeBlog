package com.perfree.vo.menu;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class MenuBaseVO {

    @Schema(description = "菜单名", name = "name")
    @NotBlank(message = "菜单名不允许为空")
    @Length(max = 30, message = "菜单名最多30个字符")
    private String name;

    @Schema(description = "菜单url", name = "url")
    @NotBlank(message = "菜单链接不允许为空")
    @Length(max = 50, message = "菜单链接最多50个字符")
    private String url;

    @Schema(description = "菜单图标", name = "icon")
    private String icon;

    @Schema(description = "菜单序号", name = "seq")
    private Integer seq;

    @Schema(description = "菜单类型", name = "type", example = "0:前台,1:后台")
    private Integer type;

    @Schema(description = "菜单状态", name = "status", example = "0:启用,1禁用")
    @NotNull(message = "菜单状态不允许为空")
    private Integer status;

    @Schema(description = "菜单打开方式", name = "target", example = "0本页,1:新窗口")
    @NotNull(message = "打开方式不允许为空")
    private Integer target;

}
