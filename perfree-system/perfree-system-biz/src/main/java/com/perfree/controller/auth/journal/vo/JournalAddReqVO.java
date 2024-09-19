package com.perfree.controller.auth.journal.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Schema(description = "动态添加ReqVO")
@Data
public class JournalAddReqVO {
    @Schema(description = "动态内容", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "动态内容不能为空")
    private String content;

    @Schema(description = "动态内容类型:html/markdown/journal", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "动态内容类型不能为空")
    private String contentModel;

    @Schema(description = "解析后的动态内容", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "解析后的动态内容不能为空")
    private String parseContent;

    @Schema(description = "状态0:已发布,1:草稿, 2 仅自己可见", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "动态状态不能为空")
    private Integer status;

    @Schema(description = "附件集合")
    private List<JournalAttachAddReqVO> attachList;
}
