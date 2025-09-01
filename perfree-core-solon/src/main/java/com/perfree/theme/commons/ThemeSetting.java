package com.perfree.theme.commons;

import cn.hutool.json.JSONObject;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

@Data
@Schema(description = "主题设置信息")
@NoArgsConstructor
public class ThemeSetting {

    @Schema(description = "主题表单配置")
    private HashMap<String, JSONObject> option;

    @Schema(description = "主题表单项")
    private List<JSONObject> rule;
}

