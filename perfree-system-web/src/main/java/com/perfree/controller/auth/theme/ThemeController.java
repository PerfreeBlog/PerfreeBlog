package com.perfree.controller.auth.theme;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.controller.auth.attach.vo.AttachRespVO;
import com.perfree.controller.auth.attach.vo.AttachUploadVO;
import com.perfree.controller.auth.theme.vo.InstallThemeReqVO;
import com.perfree.convert.attach.AttachConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.model.Attach;
import com.perfree.service.theme.ThemeService;
import com.perfree.theme.commons.ThemeInfo;
import com.perfree.theme.ThemeManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "主题相关接口")
@RequestMapping("api/auth/theme")
public class ThemeController {

    @Resource
    private ThemeService themeService;

    @Resource
    private ThemeManager themeManager;

    @GetMapping("allTheme")
    @Operation(summary = "获取所有主题")
    public CommonResult<List<ThemeInfo>> allTheme(){
        return CommonResult.success(themeManager.getAllTheme());
    }

    @PostMapping("installTheme")
    @Operation(summary = "安装主题")
    public CommonResult<ThemeInfo> installTheme(InstallThemeReqVO installThemeReqVO) throws IOException {
        String multiFileName = installThemeReqVO.getFile().getOriginalFilename();
        File dir = new File(SystemConstants.UPLOAD_TEMP_PATH);
        if (!dir.exists()){
            boolean mkdirs = dir.mkdirs();
            if (!mkdirs) {
                throw new ServiceException(ErrorCode.SAVE_THEME_ERROR);
            }
        }
        File file = new File(SystemConstants.UPLOAD_TEMP_PATH + SystemConstants.FILE_SEPARATOR + multiFileName);
        installThemeReqVO.getFile().transferTo(file.getAbsoluteFile());
        return success(themeManager.installTheme(file));
    }


    @PostMapping("swatchTheme")
    @Operation(summary = "切换主题")
    public CommonResult<Boolean> swatchTheme(@RequestParam(value = "themeName") String themeName) {
        return success(themeManager.swatchTheme(themeName));
    }


    @DeleteMapping("unInstallTheme")
    @Operation(summary = "卸载主题")
    public CommonResult<Boolean> unInstallTheme(@RequestParam(value = "themeName") String themeName) {
        return success(themeManager.unInstallTheme(themeName));
    }

}
