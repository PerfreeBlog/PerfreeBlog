package com.perfree.controller.auth.category.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;


@Schema(description = "分类树形列表ReqVO")
@Data
public class CategoryListTreeReqVO {

    @Schema(description = "分类名")
    private String name;

    @Schema(description = "状态0:正常,1禁用")
    private Integer status;
}