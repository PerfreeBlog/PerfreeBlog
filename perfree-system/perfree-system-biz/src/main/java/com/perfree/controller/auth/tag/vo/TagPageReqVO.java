package com.perfree.controller.auth.tag.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "标签分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class TagPageReqVO extends PageParam {
    @Schema(description = "标签名")
    private String name;
}
