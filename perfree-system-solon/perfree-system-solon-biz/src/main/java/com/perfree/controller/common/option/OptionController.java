package com.perfree.controller.common.option;


import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.option.vo.OptionRespVO;
import com.perfree.convert.option.OptionConvert;
import com.perfree.system.api.option.dto.OptionDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.noear.solon.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
@Tag(name = "系统配置接口")
@Mapping("api/option")
public class OptionController {

    @Inject
    private OptionCacheService optionCacheService;

    @Get
    @Mapping("getOptionByKeysAndIdentification")
    @Operation(summary = "根据key和标识获取配置项")
    public CommonResult<List<OptionRespVO>> getOptionByNoAuth(@Param("keys") String[] keys, @Param("identification") String identification){
        List<OptionDTO> optionDTOList = new ArrayList<>();
        for (String key : keys) {
            OptionDTO openOption = optionCacheService.getOption(key, identification);
            optionDTOList.add(openOption);
        }
        return CommonResult.success(OptionConvert.INSTANCE.convertCacheDTO2RespListVO(optionDTOList));
    }
}
