package com.perfree.controller.common.option;


import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.option.vo.OptionRespVO;
import com.perfree.convert.option.OptionConvert;
import com.perfree.system.api.option.dto.OptionDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@Tag(name = "系统配置接口")
@RequestMapping("api/option")
public class OptionController {

    @Resource
    private OptionCacheService optionCacheService;

    @GetMapping("getOptionByKeysAndIdentification")
    @Operation(summary = "根据key和标识获取配置项")
    public CommonResult<List<OptionRespVO>> getOptionByNoAuth(@RequestParam("keys") String[] keys, @RequestParam("identification") String identification){
        List<OptionDTO> optionDTOList = new ArrayList<>();
        for (String key : keys) {
            OptionDTO openOption = optionCacheService.getOption(key, identification);
            optionDTOList.add(openOption);
        }
        return CommonResult.success(OptionConvert.INSTANCE.convertCacheDTO2RespListVO(optionDTOList));
    }
}
