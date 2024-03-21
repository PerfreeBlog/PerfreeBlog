package com.perfree.controller.api.option.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "管理后台 - 配置RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class OptionRespVO extends OptionBaseVO{
}
