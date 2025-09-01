package com.perfree.controller.auth.journal.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class JournalAttachRespVO {

    private Integer id;

    @Schema(description = "附件id")
    private Integer attachId;

    @Schema(description = "附件url")
    private String url;

    @Schema(description = "文件类型")
    private String type;

    @Schema(description = "文件类型mineType")
    private String mineType;

    @Schema(description = "文件名称")
    private String name;
}
