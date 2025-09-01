package com.perfree.controller.auth.attachLibraryItems.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 附件库数据 导出ReqVO
* @author Perfree
**/
@Schema(description = "附件库数据导出ReqVO")
@Data
public class AttachLibraryItemsExportReqVO {

    @Schema(description = "附件库id")
    private Integer attachLibraryId;

    @Schema(description = "文件名称")
    private String name;
}
