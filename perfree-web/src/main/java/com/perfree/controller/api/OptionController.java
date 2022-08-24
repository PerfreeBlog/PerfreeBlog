package com.perfree.controller.api;

import com.perfree.base.BaseApiController;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.commons.ResponseBean;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin
@Api(value = "配置相关",tags = "配置相关")
@RequestMapping(value = {"/api/option", "/option"})
public class OptionController extends BaseApiController {

    @GetMapping("/getByKey")
    @ApiOperation(value = "根据key获取配置项", notes = "根据key获取配置项")
    public ResponseBean getById(@ApiParam(name="key",value="配置key",required=true) @RequestParam("key") String key) {
        return ResponseBean.success("success", OptionCacheUtil.getDefaultValue(key, ""));
    }

    @GetMapping("/getKeys")
    @ApiOperation(value = "获取多个配置项", notes = "获取多个配置项")
    public ResponseBean getKeys(@ApiParam(name="keys",value="配置keys,英文逗号分割",required=true, example = "WEB_THEME,WEB_IS_REGISTER") @RequestParam("keys") String keys) {
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
