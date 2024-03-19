package com.perfree.controller.api;

import com.perfree.base.BaseApiController;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.commons.ResponseBean;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin
@Tag(name = "配置相关")
@RequestMapping(value = {"/api/option", "/option"})
public class OptionController extends BaseApiController {

    @GetMapping("/getByKey")
    @Operation(summary  = "根据key获取配置项")
    public ResponseBean getById(@RequestParam("key") String key) {
        return ResponseBean.success("success", OptionCacheUtil.getDefaultValue(key, ""));
    }

    @GetMapping("/getKeys")
    @Operation(summary  = "获取多个配置项")
    public ResponseBean getKeys(@RequestParam("keys") String keys) {
        if (StringUtils.isBlank(keys)) {
            return ResponseBean.success("success", null);
        }
        String[] split = keys.split(",");
        HashMap<String, String> result = new HashMap<>();
        for (String key : split) {
            result.put(key, OptionCacheUtil.getDefaultValue(key, ""));
        }
        return ResponseBean.success("success", result);
    }
}
