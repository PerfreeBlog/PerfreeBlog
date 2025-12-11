package com.perfree.plugin.pojo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PluginConfig {

    @Schema(description = "插件ID")
    private String id;

    @Schema(description = "插件名称")
    private String name;

    @Schema(description = "Mapper XML 文件位置")
    private String mapperLocation;

    @Schema(description = "插件描述")
    private String description;

    @Schema(description = "最低兼容版本")
    private String minimalVersion;

    @Schema(description = "插件版本")
    private String version;

    @Schema(description = "静态资源路径")
    private String staticLocations;

    @Schema(description = "更新地址")
    private String updateUrl;

    @Schema(description = "是否为开发模式")
    private Boolean isDev;

    @Schema(description = "前端开发地址")
    private String frontDevAddress;

    /**
     * 插件基础包名，用于组件扫描（可选）
     * 如果不指定，系统会自动扫描所有加载的类
     * 例如：com.example.myplugin
     */
    @Schema(description = "插件基础包名，用于组件扫描（可选）")
    private String basePackage;
}
