package com.perfree.service;

import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.ZipUtil;
import cn.hutool.setting.Setting;
import cn.hutool.setting.dialect.Props;
import com.perfree.common.Constants;
import com.perfree.common.FileUtil;
import com.perfree.model.Option;
import com.perfree.model.Theme;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class ThemeService {
    // 生产主题路径
    private final static String PROD_THEMES_PATH = "resources/themes";
    // 开发主题路径
    private final static String DEV_THEMES_PATH = "perfree-web/src/main/resources/themes";
    private final static String SEPARATOR = "/";

    @Autowired
    private OptionService optionService;

    /**
     * 获取所有主题
     * @return List<Theme>
     */
    public List<Theme> getAllTheme(){
        List<Theme> list = new ArrayList<>();
        File[] files = ArrayUtils.addAll(getThemeList(PROD_THEMES_PATH), getThemeList(DEV_THEMES_PATH));
        if (files == null) {
            return null;
        }
        Option web_theme = optionService.getOptionByKey(Constants.WEB_THEME);
        for (File file : files) {
            File settingFile = new File(file.getAbsolutePath() + SEPARATOR + "settings.properties");
            if (settingFile.exists()){
                Props props = new Props(settingFile, CharsetUtil.UTF_8);
                Theme theme = new Theme();
                theme.setAuthor(props.get("author").toString());
                theme.setAuthorWebSite(props.get("author.web.site").toString());
                theme.setDescription(props.get("description").toString());
                theme.setName(props.get("name").toString());
                theme.setScreenshots(SEPARATOR + "themes" + SEPARATOR + settingFile.getParentFile().getName() +
                        SEPARATOR + props.get("screenshots").toString());
                theme.setPath(settingFile.getParentFile().getName());
                if (settingFile.getParentFile().getName().equals(web_theme.getValue())){
                    theme.setIsActive(1);
                }
                theme.setUpdateUrl(props.get("update.url").toString());
                theme.setVersion(props.get("version").toString());
                list.add(theme);
            }
        }
        return list;
    }

    /**
     * 根据目录读取文件列表
     * @param path 路径
     * @return  File[]
     */
    private File[] getThemeList(String path) {
        File file = new File(path);
        if (!file.exists()) {
            return null;
        }
        return file.listFiles();
    }

    /**
     * 切换主题
     * @param theme theme
     * @return int
     */
    public int switchTheme(Theme theme) {
        Option option = new Option();
        option.setKey(Constants.WEB_THEME);
        option.setValue(theme.getPath());
        return optionService.updateValueByKey(option);
    }

    /**
     * 安装主题
     * @param multiFile multiFile
     * @return boolean
     */
    public boolean addTheme(MultipartFile multiFile) throws Exception {
        String multiFileName = multiFile.getOriginalFilename();
        File dir = new File(PROD_THEMES_PATH);
        if (!dir.exists()){
            boolean mkdirs = dir.mkdirs();
            if (!mkdirs) {
                throw new Exception("创建目录失败!" + dir.getAbsolutePath());
            }
        }
        File file = new File(PROD_THEMES_PATH + SEPARATOR + multiFileName);
        System.out.println(file.getAbsolutePath());
        multiFile.transferTo(file.getAbsoluteFile());
        File unzip = ZipUtil.unzip(file);
        boolean delete = file.delete();
        File settingFile = new File(unzip.getAbsolutePath() + SEPARATOR + "settings.properties");
        if (settingFile.exists()){
            return true;
        }
        FileUtil.deleteDirectory(unzip);
        return false;
    }

    /**
     * 卸载主题
     * @param theme theme
     * @return boolean
     */
    public boolean delTheme(Theme theme) {
        try{
            File file = new File(PROD_THEMES_PATH + SEPARATOR + theme.getPath());
            if (file.exists()) {
                FileUtil.deleteDirectory(file);
            }
            return true;
        }catch (Exception e) {
            return false;
        }
    }
}
