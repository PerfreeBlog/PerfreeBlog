package com.perfree.controller.auth.category.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "管理后台 - 分类分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryPageReqVO extends PageParam {

    @Schema(description = "分类名")
    private String name;
}
