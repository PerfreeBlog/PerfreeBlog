package com.perfree.controller.auth.option;


import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.option.vo.OptionRespVO;
import com.perfree.controller.auth.option.vo.OptionThemeAddReqVO;
import com.perfree.convert.option.OptionConvert;
import com.perfree.model.Option;
import com.perfree.service.option.OptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "系统配置相关接口")
@RequestMapping("api/auth/option")
public class OptionController {

    @Resource
    private OptionService optionService;

    @PostMapping("/saveCurrentThemeSetting")
    @Operation(summary = "保存当前启用主题的设置项")
    public CommonResult<Boolean> saveCurrentThemeSetting(@RequestBody @Valid OptionThemeAddReqVO optionThemeAddReqVO) {
        return success(optionService.saveCurrentThemeSetting(optionThemeAddReqVO));
    }

    @GetMapping("/getCurrentThemeSettingValue")
    @Operation(summary = "获取当前启用主题的所有配置项值")
    public CommonResult<List<OptionRespVO>> getCurrentThemeSettingValue() {
        List<Option> optionList = optionService.getCurrentThemeSettingValue();
        return success(OptionConvert.INSTANCE.convertToRespVOList(optionList));
    }
}