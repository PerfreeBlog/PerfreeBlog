package com.perfree.theme;

import com.perfree.cache.OptionCacheService;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.constant.OptionConstant;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.system.api.option.OptionApi;
import com.perfree.theme.commons.ThemeFile;
import com.perfree.theme.commons.ThemeInfo;
import com.perfree.theme.commons.ThemeSetting;
import jakarta.annotation.Resource;
import okio.Options;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.dromara.hutool.core.compress.ZipUtil;
import org.dromara.hutool.core.data.id.IdUtil;
import org.dromara.hutool.core.io.file.FileReader;
import org.dromara.hutool.core.io.file.FileUtil;
import org.dromara.hutool.core.io.file.FileWriter;
import org.dromara.hutool.core.io.file.PathUtil;
import org.dromara.hutool.core.io.resource.ClassPathResource;
import org.dromara.hutool.json.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
            if (themeInfo.getName().equals(optionCacheService.getDefaultValue(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM, ""))) {
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
        FileUtil.copy(unzip.getAbsoluteFile(), themeDir.getAbsoluteFile(), true);
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
        ThemeInfo themeInfo = getThemeInfo(themeName);
        if (null == themeInfo) {
            throw new ServiceException(ErrorCode.THEME_SWITCH_CHECK_ERROR);
        }
        return optionApi.updateOptionByKeyAndIdentification(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM, themeName);
    }

    /**
     * 卸载主题(只卸载生产目录的,开发换目录不卸载)
     *
     * @param themeName themeName
     * @return Boolean
     */
    public Boolean unInstallTheme(String themeName) {
        String webTheme = optionCacheService.getDefaultValue(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM, "");
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

    /**
     * 获取主题配置信息
     *
     * @param themeName themeName 可为空,为空获取当前默认主题
     * @return ThemeInfo
     */
    public ThemeInfo getThemeInfo(String themeName) {
        File themeDirFile = getThemeDirFile(themeName);
        if (null == themeDirFile) {
            return null;
        }
        return getThemeInfoByThemeFile(themeDirFile);
    }

    /**
     * 获取当前主题的设置项
     *
     * @return ThemeSetting
     */
    public ThemeSetting getCurrentThemeSetting() {
        File themeDirFile = getThemeDirFile(null);
        if (null == themeDirFile) {
            return null;
        }
        File settingJsonFile = new File(themeDirFile.getAbsolutePath() + SystemConstants.FILE_SEPARATOR + "setting.json");
        if (!settingJsonFile.exists()) {
            return null;
        }
        String fileContent = FileUtil.readUtf8String(settingJsonFile);
        return JSONUtil.toBean(fileContent, ThemeSetting.class);
    }

    /**
     * 获取主题所在目录的File对象,如果themeName为空则获取当前启用主题
     *
     * @param themeName themeName
     * @return File
     */
    private File getThemeDirFile(String themeName) {
        if (StringUtils.isBlank(themeName)) {
            themeName = optionCacheService.getDefaultValue(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM, "");
        }
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeName);
        File devFile = getClassPathFile(SystemConstants.DEV_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeName);
        if (null != devFile && devFile.exists()) {
            return devFile;
        }
        if (file.exists()) {
            return file;
        }
        return null;
    }

    public List<ThemeFile> getThemeFilesByName(String themeName) {
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeName);
        if (!file.exists()) {
            file = getClassPathFile(SystemConstants.DEV_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeName);
        }
        if (null == file || !file.exists()) {
            return null;
        }
        List<ThemeFile> result = new ArrayList<>();
        getThemeFilesByNameHandle(file, result, "-1", themeName);
        return result.stream()
                .sorted(Comparator.comparing(ThemeFile::getFileType, Comparator.comparing(s -> !s.equals("dir"))))
                .collect(Collectors.toList());
    }

    private void getThemeFilesByNameHandle(File dir, List<ThemeFile> result, String pid, String staticPath) {
        File[] files = dir.listFiles();
        if (files == null) {
            return;
        }
        for (File file : files) {
            ThemeFile themeFile = new ThemeFile();
            themeFile.setFilePath(file.getAbsolutePath());
            themeFile.setFileName(file.getName());
            themeFile.setId(IdUtil.simpleUUID());
            themeFile.setPid(pid);
            themeFile.setStaticPath(staticPath + SystemConstants.FILE_SEPARATOR + file.getName());
            if (file.isDirectory()) {
                themeFile.setFileType("dir");
                getThemeFilesByNameHandle(file, result, themeFile.getId(), staticPath + SystemConstants.FILE_SEPARATOR + file.getName());
            } else {
                if (file.getName().contains(".")) {
                    themeFile.setFileType(file.getName().substring(file.getName().lastIndexOf(".")).replace(".", ""));
                } else {
                    themeFile.setFileType("other");
                }
            }
            result.add(themeFile);
        }
    }

    public String getThemeFileContent(String path, String themeName) {
        boolean validResult = validThemeFilePath(themeName, path);
        if (!validResult) {
            throw new ServiceException(ErrorCode.ACCESS_VIOLATION);
        }
        File findFile = new File(path);
        if (!findFile.exists()) {
            return null;
        }
        FileReader fileReader = new FileReader(findFile, StandardCharsets.UTF_8);
        return fileReader.readString();
    }

    /**
     * 保存主题某个文件内容
     * @param path path
     * @param themeName themeName
     * @param content content
     * @return Boolean
     */
    public Boolean saveThemeFileContent(String path, String themeName, String content) {
        boolean validResult = validThemeFilePath(themeName, path);
        if (!validResult) {
            throw new ServiceException(ErrorCode.ACCESS_VIOLATION);
        }
        File file = new File(path);
        FileWriter writer = new FileWriter(file);
        writer.write(content);
        return true;
    }

    private boolean validThemeFilePath (String themeName, String path){
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeName);
        if (!file.exists()) {
            file = getClassPathFile(SystemConstants.DEV_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themeName);
        }
        if (null == file || !file.exists()) {
            return false;
        }
        boolean sub = PathUtil.isSub(Path.of(file.getAbsolutePath()), Path.of(path));
        if (!sub) {
            LOGGER.error("违规访问!{}", path);
            return false;
        }

        return true;
    }

    public List<String> getThemePageTpl() {
        File themeDirFile = getThemeDirFile(null);
        if (null == themeDirFile || !themeDirFile.exists()) {
            throw new ServiceException(ErrorCode.OPTION_WEB_THEME_NOT_EXIST);
        }
        List<String> pageTemplates = new ArrayList<>();
        File pageDirFile = new File(themeDirFile.getAbsolutePath() + SystemConstants.FILE_SEPARATOR + "page");
        if (!pageDirFile.exists()) {
            return pageTemplates;
        }
        File[] files = pageDirFile.listFiles();
        if (null == files) {
            return pageTemplates;
        }
        for (File file : files) {
            pageTemplates.add("page/" + file.getName());
        }
        return pageTemplates;
    }
}
