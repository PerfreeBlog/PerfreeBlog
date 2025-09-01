package com.perfree.controller.auth.link.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "友链添加ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class LinkAddReqVO extends LinkBaseVO {

}
