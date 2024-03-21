package com.perfree.controller.api.option;

import com.perfree.base.BaseApiController;
import com.perfree.commons.CommonResult;
import com.perfree.controller.api.option.vo.OptionQueryReqVO;
import com.perfree.controller.api.option.vo.OptionRespVO;
import com.perfree.convert.OptionConvert;
import com.perfree.service.option.OptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Tag(name = "配置相关")
@RequestMapping("/api/option")
public class OptionController extends BaseApiController {

    @Resource
    private OptionService optionService;

    @PostMapping("/getOptions")
    @Operation(summary = "获取配置(英文逗号分隔)")
    public CommonResult<List<OptionRespVO>> getOptions(@RequestBody OptionQueryReqVO optionQueryReqVO) {
        return CommonResult.success(OptionConvert.INSTANCE.convertRespVOList(optionService.getOptions(optionQueryReqVO)));
    }
}
