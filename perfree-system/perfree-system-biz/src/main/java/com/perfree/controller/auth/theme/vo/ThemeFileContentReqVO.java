package com.perfree.controller.auth.theme.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "获取主题某个文件内容ReqVO")
@Data
public class ThemeFileContentReqVO {
    private String path;

    private String themePath;

}
