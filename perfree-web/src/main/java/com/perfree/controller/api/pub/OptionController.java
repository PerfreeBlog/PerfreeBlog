package com.perfree.controller.api.pub;

import com.perfree.base.BaseApiController;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Option;
import com.perfree.service.OptionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Api(value = "配置相关",tags = "配置相关")
@RequestMapping("/api/option")
public class OptionController extends BaseApiController {

    @Autowired
    private OptionService optionService;

    @GetMapping("/getByKey")
    @ApiOperation(value = "根据key获取配置项", notes = "根据key获取配置项")
    public ResponseBean getById(@ApiParam(name="key",value="配置key",required=true) @RequestParam("key") String key) {
        Option option = optionService.getOptionByKey(key);
        return ResponseBean.success("success", option);
    }
}
