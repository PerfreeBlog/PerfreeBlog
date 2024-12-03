package com.perfree.theme;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.io.file.FileWriter;
import cn.hutool.core.io.file.PathUtil;
import cn.hutool.core.io.resource.ClassPathResource;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.ZipUtil;
import cn.hutool.json.JSONUtil;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.FileUtils;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.constant.OptionConstant;
import com.perfree.enjoy.EnjoyConfig;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.system.api.option.OptionApi;
import com.perfree.theme.commons.ThemeFile;
import com.perfree.theme.commons.ThemeInfo;
import com.perfree.theme.commons.ThemeSetting;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.*;
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
            if (file.getName().equals(optionCacheService.getDefaultValue(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM, ""))) {
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
        FileUtils.copyFile(unzip.getAbsolutePath(), themeDir.getAbsolutePath(), true);
        FileUtil.del(unzip.getAbsoluteFile());
        return themeInfo;
    }

    /**
     * 切换主题
     *
     * @param themePath themePath
     * @return Boolean
     */
    public Boolean swatchTheme(String themePath) {
        ThemeInfo themeInfo = getThemeInfo(themePath);
        if (null == themeInfo) {
            throw new ServiceException(ErrorCode.THEME_SWITCH_CHECK_ERROR);
        }
        Boolean result = optionApi.updateOptionByKeyAndIdentification(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM, themePath);
        initThemeResourceHandle(themePath);
        return result;
    }

    /**
     * 卸载主题(只卸载生产目录的,开发换目录不卸载)
     *
     * @param themePath themePath
     * @return Boolean
     */
    public Boolean unInstallTheme(String themePath) {
        String webTheme = optionCacheService.getDefaultValue(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM, "");
        if (webTheme.equals(themePath)) {
            throw new ServiceException(ErrorCode.THEME_UNINSTALL_ERROR_BY_USE);
        }
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themePath);
        if (file.exists()) {
            FileUtil.del(file.getAbsoluteFile());
            return true;
        }
        throw new ServiceException(ErrorCode.THEME_NOT_EXIST_OR_IS_DEV);
    }

    /**
     * 获取主题配置信息
     *
     * @param themePath themePath 可为空,为空获取当前默认主题
     * @return ThemeInfo
     */
    public ThemeInfo getThemeInfo(String themePath) {
        File themeDirFile = getThemeDirFile(themePath);
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
     * @param themePath themePath
     * @return File
     */
    private File getThemeDirFile(String themePath) {
        if (StringUtils.isBlank(themePath)) {
            themePath = optionCacheService.getDefaultValue(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM, "");
        }
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themePath);
        File devFile = getClassPathFile(SystemConstants.DEV_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themePath);
        if (null != devFile && devFile.exists()) {
            return devFile;
        }
        if (file.exists()) {
            return file;
        }
        return null;
    }

    public List<ThemeFile> getThemeFilesByName(String themePath) {
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themePath);
        if (!file.exists()) {
            file = getClassPathFile(SystemConstants.DEV_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themePath);
        }
        if (null == file || !file.exists()) {
            return null;
        }
        List<ThemeFile> result = new ArrayList<>();
        getThemeFilesByNameHandle(file, result, "-1", themePath);
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

    public String getThemeFileContent(String path, String themePath) {
        boolean validResult = validThemeFilePath(themePath, path);
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
        EnjoyConfig.jfr.getEngine().removeAllTemplateCache();
        return true;
    }

    private boolean validThemeFilePath (String themePath, String path){
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themePath);
        if (!file.exists()) {
            file = getClassPathFile(SystemConstants.DEV_THEMES_PATH + SystemConstants.FILE_SEPARATOR + themePath);
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

    public void initThemeResourceHandle(String themePath) {
        if (StringUtils.isBlank(themePath)) {
            themePath = optionCacheService.getDefaultValue(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM, "");
        }
        if (StringUtils.isBlank(themePath)){
            return;
        }
        ThemeInfo themeInfo = getThemeInfo(themePath);
        if (null == themeInfo) {
            return;
        }
        if (StringUtils.isBlank(themeInfo.getType())){
            return;
        }
        String upperCase = themeInfo.getType().toUpperCase();
        if (SystemConstants.THEME_TYPE_NODE.contains(upperCase)){
            addStaticResourceHandler("file:./resources/static/themes/" + themePath + "/static/");
        }
    }

    public void addStaticResourceHandler(String locationStr) {
        try{
            SimpleUrlHandlerMapping mapping = (SimpleUrlHandlerMapping) SpringBeanUtil.context.getBean("resourceHandlerMapping");
            ResourceHttpRequestHandler handler = (ResourceHttpRequestHandler) mapping.getUrlMap().get("/static/**");
            Class<?> clazz = handler.getClass();
            Field field = clazz.getDeclaredField("locationValues");
            field.setAccessible(true);
            @SuppressWarnings("unchecked")
            List<String> locationValues = (List<String>) field.get(handler);
            if (locationValues.contains(locationStr)) {
                return;
            }
            Set<String> locationStrings = new HashSet<>(locationValues);
            locationStrings.add(locationStr);

            handler.setLocationValues(locationStrings.stream().toList());
            handler.getLocations().clear();
            handler.getResourceResolvers().clear();
            handler.afterPropertiesSet();
        }catch (Exception e) {
            throw new BeanInitializationException("Failed to init ResourceHttpRequestHandler", e);
        }
    }
}
