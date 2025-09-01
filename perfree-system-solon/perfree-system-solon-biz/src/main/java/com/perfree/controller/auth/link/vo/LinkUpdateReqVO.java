package com.perfree.controller.auth.link.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "友链更新ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class LinkUpdateReqVO extends LinkBaseVO {

    @Schema(description = "友链ID", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "友链ID不能为空")
    private Integer id;


}
