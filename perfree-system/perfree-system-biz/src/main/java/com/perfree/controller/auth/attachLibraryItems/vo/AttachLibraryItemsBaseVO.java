package com.perfree.controller.auth.attachLibraryItems.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 附件库数据 BaseVO
* @author Perfree
**/
@Data
public class AttachLibraryItemsBaseVO {


    @Schema(description = "附件库id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "附件库id不能为空")
    private Integer attachLibraryId;

    @Schema(description = "url", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "url不能为空")
    private String url;

    @Schema(description = "文件名称")
    private String name;

    @Schema(description = "描述")
    private String description;
}
