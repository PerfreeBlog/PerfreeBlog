package com.perfree.controller.auth.theme.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Schema(description = "附件上传ReqVO")
@Data
public class InstallThemeReqVO {

    @Schema(description = "主题文件", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "主题文件不能为空")
    private MultipartFile file;

}
