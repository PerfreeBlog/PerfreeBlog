package com.perfree.controller.auth.journal.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Schema(description = "动态添加ReqVO")
@Data
public class JournalUpdateReqVO {

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "动态id不能为空")
    private Integer id;

    @Schema(description = "动态内容")
    private String content;

    @Schema(description = "动态内容类型:html/markdown/journal")
    private String contentModel;

    @Schema(description = "解析后的动态内容")
    private String parseContent;

    @Schema(description = "是否可见", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "是否可见不能为空")
    private Integer visibility;

    @Schema(description = "附件集合")
    private List<JournalAttachAddReqVO> attachList;
}
