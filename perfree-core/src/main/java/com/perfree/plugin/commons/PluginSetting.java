package com.perfree.plugin.commons;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.dromara.hutool.json.JSONObject;

import java.util.HashMap;
import java.util.List;

@Data
@Schema(description = "插件设置信息")
@NoArgsConstructor
public class PluginSetting {

    @Schema(description = "插件表单配置")
    private HashMap<String, JSONObject> option;

    @Schema(description = "插件表单项")
    private List<JSONObject> rule;
}

