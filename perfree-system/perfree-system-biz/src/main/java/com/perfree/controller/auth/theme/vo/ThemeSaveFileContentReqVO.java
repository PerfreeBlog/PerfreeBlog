package com.perfree.controller.auth.theme.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "保存主题某个文件内容ReqVO")
@Data
public class ThemeSaveFileContentReqVO {
    private String path;

    private String themePath;

    private String content;

}
