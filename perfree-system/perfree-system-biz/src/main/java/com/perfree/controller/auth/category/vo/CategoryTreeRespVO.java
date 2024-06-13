package com.perfree.controller.auth.category.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.List;

@Schema(description = "管理后台 - 分类树形结构RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryTreeRespVO extends CategoryBaseVO{

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "文章数量")
    private Integer count;

    @Schema(description = "状态0:正常,1禁用")
    private Integer status;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;

    @Schema(description = "子分类")
    private List<CategoryTreeRespVO> children;

}
