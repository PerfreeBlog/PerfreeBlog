package com.perfree.controller.auth.dict.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * @description 数据字典 AddReqVO
 * @author Perfree
 **/
@Schema(description = "数据字典AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DictUpdateReqVO extends DictBaseVO{

    @Schema(description = "主键", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer id;
}