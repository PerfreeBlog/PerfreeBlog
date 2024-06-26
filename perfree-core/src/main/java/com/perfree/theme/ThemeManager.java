package com.perfree.theme;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.resource.ClassPathResource;
import cn.hutool.core.util.ZipUtil;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.system.api.option.OptionApi;
import com.perfree.theme.commons.ThemeInfo;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class ThemeManager {

    private final static Logger LOGGER = LoggerFactory.getLogger(ThemeManager.class);

    @Resource
    private OptionCacheService optionCacheService;

    @Resource
    private OptionApi optionApi;

    /**
     * 获取所有主题
     *
     * @return List<ThemeInfo>
     */
    public List<ThemeInfo> getAllTheme() {
        List<ThemeInfo> result = new ArrayList<>();
        File[] files = ArrayUtils.addAll(getThemeList(), getClassPathThemeList());
        if (files == null || files.length == 0) {
            return null;
        }
        for (File file : files) {
            ThemeInfo themeInfo = getThemeInfoByThemeFile(file);
            if (null != themeInfo) {
                result.add(themeInfo);
            }
        }
        return result;
    }

    /**
     * 根据主题路径获取主题配置信息
     *
     * @param file file
     * @return ThemeInfo
     */
    public ThemeInfo getThemeInfoByThemeFile(File file) {
        ThemeInfo themeInfo = null;
        File themeYaml = new File(file.getAbsolutePath() + SystemConstants.FILE_SEPARATOR + "theme.yaml");
        if (!themeYaml.exists()) {
            return null;
        }
        try (InputStream input = new FileInputStream(themeYaml)) {
            // 读取 YAML 文件
            Yaml yaml = new Yaml();
            themeInfo = yaml.loadAs(input, ThemeInfo.class);
            if (file.getName().equals(optionCacheService.getDefaultValue(OptionEnum.WEB_THEME.getKey(), ""))) {
                themeInfo.setIsActive(1);
            }
            themeInfo.setPath(file.getName());
            themeInfo.setAbsolutePath(file.getAbsolutePath());
        } catch (Exception ignored) {
        }
        return themeInfo;
    }

    /**
     * 获取生产环境下主题文件列表
     *
     * @return File[]
     */
    private File[] getThemeList() {
        File file = new File(SystemConstants.PROD_THEMES_PATH);
        if (!file.exists()) {
            return null;
        }
        return file.listFiles();
    }

    /**
     * 获取开发环境下主题列表
     *
     * @return File[]
     */
    private File[] getClassPathThemeList() {
        try {
            return new ClassPathResource(SystemConstants.DEV_THEMES_PATH).getFile().listFiles();
        } catch (Exception e) {
            return null;
        }
    }

    private File getClassPathFile(String path) {
        try {
            return new ClassPathResource(path).getFile();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 安装主题(zip)
     *
     * @param file file
     * @return ThemeInfo
     */
    public ThemeInfo installTheme(File file) {
        File unzip = ZipUtil.unzip(file);
        boolean delete = file.delete();
        ThemeInfo themeInfo = getThemeInfoByThemeFile(unzip.getAbsoluteFile());
        if (null == themeInfo) {
            FileUtil.del(unzip);
            throw new ServiceException(ErrorCode.THEME_CONFIG_YAML_ERROR);
        }
        File themeDir = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeInfo.getName());
        FileUtil.copyFilesFromDir(unzip.getAbsoluteFile(), themeDir.getAbsoluteFile(), true);
        FileUtil.del(unzip);
        return themeInfo;
    }

    /**
     * 切换主题
     *
     * @param themeName themeName
     * @return Boolean
     */
    public Boolean swatchTheme(String themeName) {
        ThemeInfo themeInfo = null;
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeName);
        File devFile = getClassPathFile(SystemConstants.DEV_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeName);
        if (file.exists()) {
            themeInfo = getThemeInfoByThemeFile(file);
        }
        if (null != devFile && devFile.exists()) {
            themeInfo = getThemeInfoByThemeFile(devFile);
        }

        if (null == themeInfo) {
            throw new ServiceException(ErrorCode.THEME_SWITCH_CHECK_ERROR);
        }
        return optionApi.updateOptionByKey(OptionEnum.WEB_THEME.getKey(), themeName);
    }

    /**
     * 卸载主题(只卸载生产目录的,开发换目录不卸载)
     *
     * @param themeName themeName
     * @return Boolean
     */
    public Boolean unInstallTheme(String themeName) {
        String webTheme = optionCacheService.getDefaultValue(OptionEnum.WEB_THEME.getKey(), "");
        if (webTheme.equals(themeName)) {
            throw new ServiceException(ErrorCode.THEME_UNINSTALL_ERROR_BY_USE);
        }
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeName);
        if (file.exists()) {
            FileUtil.del(file.getAbsoluteFile());
            return true;
        }
        throw new ServiceException(ErrorCode.THEME_NOT_EXIST_OR_IS_DEV);
    }
}
