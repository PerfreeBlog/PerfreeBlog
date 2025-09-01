package com.perfree.controller.auth.attachLibrary.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 附件库 导出ReqVO
* @author Perfree
**/
@Schema(description = "附件库导出ReqVO")
@Data
public class AttachLibraryExportReqVO {

    @Schema(description = "附件库名称")
    private String name;

    @Schema(description = "附件库类型: img: 图库, video视频库, audio音乐库,other其他")
    private String type;

    @Schema(description = "是否可见, 0是, 1否")
    private Integer visibility;
}
