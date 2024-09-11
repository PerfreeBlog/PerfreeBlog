package com.perfree.controller.auth.tag.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Schema(description = "标签RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class TagRespVO extends TagBaseVO {
    @Schema(description = "id")
    private Integer id;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;
}
