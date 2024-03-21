package com.perfree.controller.api.setting;

import com.perfree.base.BaseApiController;
import com.perfree.commons.CommonResult;
import com.perfree.service.option.OptionService;
import com.perfree.service.update.UpdateService;
import com.perfree.controller.api.option.vo.OptionCreateOrUpdateReqVO;
import com.perfree.controller.api.setting.vo.UpdateRespVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Tag(name = "系统设置相关")
@RequestMapping("/api/setting")
public class SettingController extends BaseApiController {

    @Resource
    private UpdateService updateService;

    @Resource
    private OptionService optionService;

    @GetMapping("/checkUpdate")
    @Operation(summary = "检查更新")
    public CommonResult<UpdateRespVO> checkUpdate() {
        return CommonResult.success(updateService.checkUpdate());
    }

    @PostMapping("/saveOrUpdateSetting")
    @Operation(summary = "保存或更新网站设置")
    public CommonResult<Boolean> saveOrUpdateSetting(@Valid @RequestBody OptionCreateOrUpdateReqVO optionCreateOrUpdateReqVO) {
        optionService.saveOrUpdateSetting(optionCreateOrUpdateReqVO);
        return CommonResult.success(true);
    }
}
