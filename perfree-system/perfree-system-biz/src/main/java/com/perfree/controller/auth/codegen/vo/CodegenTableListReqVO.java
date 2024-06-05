package com.perfree.controller.auth.codegen.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "管理后台 - 获取数据库表 Request VO")
@Data
public class CodegenTableListReqVO {

    @Schema(description = "表名")
    private String tableName;
}
