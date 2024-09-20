package com.perfree.controller.auth.journal.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Schema(description = "动态添加ReqVO")
@Data
public class JournalAttachAddReqVO {

    @Schema(description = "附件id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "附件id不能为空")
    private Integer attachId;

    @Schema(description = "附件url", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "附件url不能为空")
    private String url;

    @Schema(description = "文件类型")
    private String type;

    @Schema(description = "文件类型mineType")
    private String mineType;


    @Schema(description = "文件名称")
    private String name;
}
