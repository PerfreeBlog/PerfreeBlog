package com.perfree.controller.auth.attachLibraryItems.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import com.perfree.commons.common.PageParam;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 附件库数据 分页ReqVO
* @author Perfree
**/
@Schema(description = "附件库数据分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachLibraryItemsPageReqVO extends PageParam {

    @Schema(description = "附件库id")
    private Integer attachLibraryId;

    @Schema(description = "文件名称")
    private String name;
}
