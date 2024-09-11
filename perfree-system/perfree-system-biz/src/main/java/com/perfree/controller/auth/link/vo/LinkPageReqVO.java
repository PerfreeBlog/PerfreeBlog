package com.perfree.controller.auth.link.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "分友链分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class LinkPageReqVO extends PageParam {

    @Schema(description = "网站名")
    private String name;
}
