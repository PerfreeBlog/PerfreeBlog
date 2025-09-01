package com.perfree.controller.auth.attachLibrary.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * @description 附件库 AddReqVO
 * @author Perfree
 **/
@Schema(description = "附件库AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachLibraryUpdateReqVO extends AttachLibraryBaseVO{

    @Schema(description = "主键", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "主键不能为空")
    private Integer id;
}
