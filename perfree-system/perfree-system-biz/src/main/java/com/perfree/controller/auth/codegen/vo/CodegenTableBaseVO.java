package com.perfree.controller.auth.codegen.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class CodegenTableBaseVO {

    @Schema(description = "生成场景", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "导入类型不能为空")
    private Integer scene;

    @Schema(description = "表名称", requiredMode = Schema.RequiredMode.REQUIRED, example = "xwtbs")
    @NotNull(message = "表名称不能为空")
    private String tableName;

    @Schema(description = "表描述", requiredMode = Schema.RequiredMode.REQUIRED, example = "萱闱堂")
    @NotNull(message = "表描述不能为空")
    private String tableComment;


    @Schema(description = "模块名", requiredMode = Schema.RequiredMode.REQUIRED, example = "system")
    @NotNull(message = "模块名不能为空")
    private String moduleName;

    @Schema(description = "类名称", requiredMode = Schema.RequiredMode.REQUIRED, example = "CodegenTable")
    @NotNull(message = "类名称不能为空")
    private String className;

    @Schema(description = "类描述", requiredMode = Schema.RequiredMode.REQUIRED, example = "代码生成器的表定义")
    @NotNull(message = "类描述不能为空")
    private String classComment;

    @Schema(description = "作者", requiredMode = Schema.RequiredMode.REQUIRED, example = "萱闱堂源码")
    @NotNull(message = "作者不能为空")
    private String author;

    @Schema(description = "父菜单编号", example = "1024")
    private String parentMenuId;

}
