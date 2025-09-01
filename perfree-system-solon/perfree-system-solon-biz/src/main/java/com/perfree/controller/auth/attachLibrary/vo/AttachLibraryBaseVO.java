package com.perfree.controller.auth.attachLibrary.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 附件库 BaseVO
* @author Perfree
**/
@Data
public class AttachLibraryBaseVO {


    @Schema(description = "附件库名称", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "附件库名称不能为空")
    private String name;

    @Schema(description = "描述")
    private String description;

    @Schema(description = "附件库类型: img: 图库, video视频库, audio音乐库,other其他")
    @NotEmpty(message = "附件库类型不能为空")
    private String type;

    @Schema(description = "是否可见, 0是, 1否")
    private Integer visibility;

    @Schema(description = "封面图")
    private String thumbnail;
}
