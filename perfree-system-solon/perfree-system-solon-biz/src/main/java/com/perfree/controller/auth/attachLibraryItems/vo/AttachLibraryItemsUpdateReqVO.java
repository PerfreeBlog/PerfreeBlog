package com.perfree.controller.auth.attachLibraryItems.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * @description 附件库数据 AddReqVO
 * @author Perfree
 **/
@Schema(description = "附件库数据AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachLibraryItemsUpdateReqVO extends AttachLibraryItemsBaseVO{

    @Schema(description = "", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "不能为空")
    private Integer id;
}
