package com.perfree.controller.auth.site.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "站点添加ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class SiteAddReqVO extends SiteBaseVO{

}
