package com.perfree.controller.auth.theme;


import cn.dev33.satoken.annotation.SaCheckPermission;
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
import org.noear.solon.annotation.*;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.IOException;
import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "主题相关接口")
@Mapping("api/auth/theme")
public class ThemeController {


    @Inject
    private ThemeManager themeManager;

    @Inject
    private OptionService optionService;

    @Get
    @Mapping("allTheme")
    @Operation(summary = "获取所有主题")
    public CommonResult<List<ThemeInfo>> allTheme() {
        return CommonResult.success(themeManager.getAllTheme());
    }

    @Post
    @Mapping("installTheme")
    @Operation(summary = "安装主题")
    @SaCheckPermission("admin:theme:install")
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


    @Post
    @Mapping("swatchTheme")
    @Operation(summary = "切换主题")
    @SaCheckPermission("admin:theme:swatchTheme")
    public CommonResult<Boolean> swatchTheme(@Param(value = "themePath") String themePath) {
        return success(themeManager.swatchTheme(themePath));
    }


    @Delete
    @Mapping("unInstallTheme")
    @Operation(summary = "卸载主题")
    @SaCheckPermission("admin:theme:uninstall")
    public CommonResult<Boolean> unInstallTheme(@Param(value = "themePath") String themePath) {
        Boolean result = themeManager.unInstallTheme(themePath);
        if (result) {
            optionService.removeOptionByIdentification(SystemConstants.THEME_OPTION_IDENT_PRE  + themePath);
        }
        return success(result);
    }

    @Get
    @Mapping("getCurrentThemeSetting")
    @Operation(summary = "获取当前启用主题的配置信息")
    public CommonResult<ThemeSetting> getCurrentThemeSetting() {
        return success(themeManager.getCurrentThemeSetting());
    }

    @Get
    @Mapping("getThemeFilesByName")
    @Operation(summary = "获取主题文件列表")
    public CommonResult<List<ThemeFile>> getThemeFilesByName(@Param(value = "themePath") String themePath) {
        return success(themeManager.getThemeFilesByName(themePath));
    }

    @Post
    @Mapping("getThemeFileContent")
    @Operation(summary = "获取主题文件内容")
    @ResponseBody
    public CommonResult<String> getThemeFileContent(@Body ThemeFileContentReqVO themeFileContentReqVO) {
        return success(themeManager.getThemeFileContent(themeFileContentReqVO.getPath(), themeFileContentReqVO.getThemePath()));
    }

    @Post
    @Mapping("saveThemeFileContent")
    @Operation(summary = "保存主题文件内容")
    @ResponseBody
    @SaCheckPermission("admin:theme:edit")
    public CommonResult<Boolean> saveThemeFileContent(@Body ThemeSaveFileContentReqVO themeSaveFileContentReqVO) {
        return success(themeManager.saveThemeFileContent(themeSaveFileContentReqVO.getPath(),
                themeSaveFileContentReqVO.getThemePath(), themeSaveFileContentReqVO.getContent()));
    }

    @Get
    @Mapping("getThemePageTpl")
    @Operation(summary = "获取当前启用主题中的模板列表")
    public CommonResult<List<String>> getThemePageTpl() {
        return success(themeManager.getThemePageTpl());
    }

}
