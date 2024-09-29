package com.perfree.controller.auth.attachLibrary.vo;

import com.perfree.commons.common.CommonUserMsg;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * @description 附件库 RespVO
 * @author Perfree
 **/
@Schema(description = "附件库RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachLibraryRespVO extends AttachLibraryBaseVO{

    @Schema(description = "主键", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer id;

    @Schema(description = "创建时间", requiredMode = Schema.RequiredMode.REQUIRED)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    private CommonUserMsg userInfo;
}
