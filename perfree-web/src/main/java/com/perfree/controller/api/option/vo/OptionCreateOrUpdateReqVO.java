package com.perfree.controller.api.option.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OptionCreateOrUpdateReqVO{

    @Schema(description = "配置列表", name = "options")
    @NotNull(message = "配置列表不允许为空")
    private List<OptionBaseVO> options;
}
