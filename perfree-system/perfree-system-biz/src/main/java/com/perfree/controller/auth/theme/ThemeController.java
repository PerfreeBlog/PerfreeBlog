package com.perfree.controller.auth.theme;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.controller.auth.theme.vo.InstallThemeReqVO;
import com.perfree.controller.auth.theme.vo.ThemeFileContentReqVO;
import com.perfree.controller.auth.theme.vo.ThemeSaveFileContentReqVO;
import com.perfree.enums.ErrorCode;
import com.perfree.service.option.OptionService;
import com.perfree.theme.ThemeManager;
import com.perfree.theme.commons.ThemeFile;
import com.perfree.theme.commons.ThemeInfo;
import com.perfree.theme.commons.ThemeSetting;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private ThemeManager themeManager;

    @Resource
    private OptionService optionService;

    @GetMapping("allTheme")
    @Operation(summary = "获取所有主题")
    public CommonResult<List<ThemeInfo>> allTheme() {
        return CommonResult.success(themeManager.getAllTheme());
    }

    @PostMapping("installTheme")
    @Operation(summary = "安装主题")
    @PreAuthorize("@ss.hasPermission('admin:theme:install')")
    public CommonResult<ThemeInfo> installTheme(InstallThemeReqVO installThemeReqVO) throws IOException {
        String multiFileName = installThemeReqVO.getFile().getOriginalFilename();
        File dir = new File(SystemConstants.UPLOAD_TEMP_PATH);
        if (!dir.exists()) {
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
    @PreAuthorize("@ss.hasPermission('admin:theme:swatchTheme')")
    public CommonResult<Boolean> swatchTheme(@RequestParam(value = "themeName") String themeName) {
        return success(themeManager.swatchTheme(themeName));
    }


    @DeleteMapping("unInstallTheme")
    @Operation(summary = "卸载主题")
    @PreAuthorize("@ss.hasPermission('admin:theme:uninstall')")
    public CommonResult<Boolean> unInstallTheme(@RequestParam(value = "themeName") String themeName) {
        Boolean result = themeManager.unInstallTheme(themeName);
        if (result) {
            optionService.removeOptionByIdentification(SystemConstants.THEME_OPTION_IDENT_PRE  + themeName);
        }
        return success(result);
    }

    @GetMapping("getCurrentThemeSetting")
    @Operation(summary = "获取当前启用主题的配置信息")
    public CommonResult<ThemeSetting> getCurrentThemeSetting() {
        return success(themeManager.getCurrentThemeSetting());
    }

    @GetMapping("getThemeFilesByName")
    @Operation(summary = "获取主题文件列表")
    public CommonResult<List<ThemeFile>> getThemeFilesByName(@RequestParam(value = "themeName") String themeName) {
        return success(themeManager.getThemeFilesByName(themeName));
    }

    @PostMapping("getThemeFileContent")
    @Operation(summary = "获取主题文件内容")
    @ResponseBody
    public CommonResult<String> getThemeFileContent(@RequestBody ThemeFileContentReqVO themeFileContentReqVO) {
        return success(themeManager.getThemeFileContent(themeFileContentReqVO.getPath(), themeFileContentReqVO.getThemeName()));
    }

    @PostMapping("saveThemeFileContent")
    @Operation(summary = "保存主题文件内容")
    @ResponseBody
    @PreAuthorize("@ss.hasPermission('admin:theme:edit')")
    public CommonResult<Boolean> saveThemeFileContent(@RequestBody ThemeSaveFileContentReqVO themeSaveFileContentReqVO) {
        return success(themeManager.saveThemeFileContent(themeSaveFileContentReqVO.getPath(),
                themeSaveFileContentReqVO.getThemeName(), themeSaveFileContentReqVO.getContent()));
    }

    @GetMapping("getThemePageTpl")
    @Operation(summary = "获取当前启用主题中的模板列表")
    public CommonResult<List<String>> getThemePageTpl() {
        return success(themeManager.getThemePageTpl());
    }

}
