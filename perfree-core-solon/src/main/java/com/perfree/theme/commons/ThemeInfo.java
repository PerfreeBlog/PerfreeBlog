package com.perfree.theme.commons;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Schema(description = "主题信息")
@NoArgsConstructor
public class ThemeInfo {

    @Schema(description = "主题名称")
    private String name;

    @Schema(description = "主题版本")
    private String version;

    @Schema(description = "作者信息")
    private Author author;

    @Schema(description = "描述")
    private String description;

    @Schema(description = "更新url")
    private String updateUrl;

    @Schema(description = "主题设置页类型(可为json/html)")
    private String settingType;

    @Schema(description = "截图")
    private String screenshots;

    @Schema(description = "是否正在使用")
    private Integer isActive = 0;

    @Schema(description = "主题路径")
    private String path;

    @Schema(description = "主题路径")
    private String absolutePath;

    @Schema(description = "主题类型")
    private String type;

}

