package com.perfree.controller.auth.category.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "分类添加ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryAddReqVO extends CategoryBaseVO {

}
