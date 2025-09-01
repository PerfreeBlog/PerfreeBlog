package com.perfree.controller.auth.category.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@EqualsAndHashCode(callSuper = true)
@Schema(description = "分类列表ReqVO")
@Data
public class CategoryPageReqVO extends PageParam {

    @Schema(description = "分类名")
    private String name;
}
