package com.perfree.controller.api.setting.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 系统更新参数实体类，对应github请求结果
 * @author Perfree
 */
@Data
public class UpdateRespVO {
    @Schema(description = "标签名", name = "tagName")
    private String tagName;

    @Schema(description = "更新版本名称", name = "name")
    private String name;

    @Schema(description = "下载url", name = "browserDownloadUrl")
    private String browserDownloadUrl;

    @Schema(description = "更新内容", name = "body")
    private String body;

    @Schema(description = "文件大小", name = "size")
    private Long size;

    @Schema(description = "文件大小字符串", name = "sizeString")
    private String sizeString;

    @Schema(description = "文件名", name = "fileName")
    private String fileName;
}
