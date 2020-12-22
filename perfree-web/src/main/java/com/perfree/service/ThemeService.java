package com.perfree.service;

import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.ZipUtil;
import cn.hutool.setting.dialect.Props;
import com.perfree.common.Constants;
import com.perfree.common.OptionCache;
import com.perfree.commons.FileUtil;
import com.perfree.model.Option;
import com.perfree.model.Theme;
import com.perfree.model.ThemeFile;
import com.perfree.model.TreeNode;
import de.rototor.pdfbox.graphics2d.IPdfBoxGraphics2DFontTextDrawer;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class ThemeService {
    @Autowired
    private OptionService optionService;

    /**
     * 获取所有主题
     * @return List<Theme>
     */
    public List<Theme> getAllTheme(){
        List<Theme> list = new ArrayList<>();
        File[] files = ArrayUtils.addAll(getThemeList(Constants.PROD_THEMES_PATH), getThemeList(Constants.DEV_THEMES_PATH));
        if (files == null) {
            return null;
        }
        for (File file : files) {
            File settingFile = new File(file.getAbsolutePath() + Constants.SEPARATOR + "settings.properties");
            if (settingFile.exists()){
                Props props = new Props(settingFile, CharsetUtil.UTF_8);
                Theme theme = new Theme();
                theme.setAuthor(props.get("author").toString());
                theme.setAuthorWebSite(props.get("author.web.site").toString());
                theme.setDescription(props.get("description").toString());
                theme.setName(props.get("name").toString());
                theme.setScreenshots("/static/themes/" + settingFile.getParentFile().getName() +
                        Constants.SEPARATOR + props.get("screenshots").toString());
                theme.setPath(settingFile.getParentFile().getName());
                if (settingFile.getParentFile().getName().equals(OptionCache.getOption(Constants.OPTION_WEB_THEME))){
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
        option.setKey(Constants.OPTION_WEB_THEME);
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
        File dir = new File(Constants.PROD_THEMES_PATH);
        if (!dir.exists()){
            boolean mkdirs = dir.mkdirs();
            if (!mkdirs) {
                throw new Exception("创建目录失败!" + dir.getAbsolutePath());
            }
        }
        File file = new File(Constants.PROD_THEMES_PATH + Constants.SEPARATOR + multiFileName);
        multiFile.transferTo(file.getAbsoluteFile());
        File unzip = ZipUtil.unzip(file);
        boolean delete = file.delete();
        File settingFile = new File(unzip.getAbsolutePath() + "/settings.properties");
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
            File file = new File(Constants.PROD_THEMES_PATH + Constants.SEPARATOR + theme.getPath());
            if (file.exists()) {
                FileUtil.deleteDirectory(file);
            }
            return true;
        }catch (Exception e) {
            return false;
        }
    }


    public File getThemeDir(String path) {
        File prodThemeFile = new File(Constants.PROD_THEMES_PATH + Constants.SEPARATOR + path);
        File devThemeFile = new File(Constants.DEV_THEMES_PATH + Constants.SEPARATOR + path);
        File themeFile = null;
        if (prodThemeFile.exists()) {
            themeFile = prodThemeFile;
        } else {
            if (devThemeFile.exists()) {
                themeFile = devThemeFile;
            }
        }
        return themeFile;
    }

    public Theme getThemeByPath(String path) {
        Theme theme = new Theme();
        File themeDir = getThemeDir(path);
        if (themeDir == null) {
            return null;
        }

        // 读取主题名称
        File settingFile = new File(themeDir.getAbsolutePath() + Constants.SEPARATOR + "settings.properties");
        if (settingFile.exists()){
            Props props = new Props(settingFile, CharsetUtil.UTF_8);
            theme.setName(props.get("name").toString());
            theme.setPath(settingFile.getParentFile().getName());
            theme.setAbsolutePath(themeDir.getAbsolutePath());
        }
        return theme;
    }


    /**
     * 根据主题获取主题内文件列表
     * @param path path
     * @return List<ThemeFile>
     */
    public List<TreeNode> getFileListByTheme(String path) {
        File themeDir = getThemeDir(path);
        if (themeDir == null) {
            return null;
        }
        return getFileListByFile(themeDir);
    }

    public List<TreeNode> getFileListByFile(File dir) {
        List<TreeNode> result = new ArrayList<>();
        for (File file : dir.listFiles()) {
            ThemeFile themeFile = new ThemeFile();
            TreeNode treeNode = new TreeNode();
            treeNode.setTitle(file.getName());
            themeFile.setFilePath(file.getAbsolutePath());
            themeFile.setFileName(file.getName());
            List<TreeNode> childThemeFile = new ArrayList<>();
            if (file.isDirectory()) {
                childThemeFile = getFileListByFile(file);
                themeFile.setFileType("dir");
            } else {
                themeFile.setFileType(file.getName().substring(file.getName().lastIndexOf(".")).replace(".",""));
            }
            treeNode.setObj(themeFile);
            treeNode.setChildren(childThemeFile);
            if (!themeFile.getFileType().equals("dir")){
                if (themeFile.getFileType().equals("html") || themeFile.getFileType().equals("css") ||
                        themeFile.getFileType().equals("js")){
                    result.add(treeNode);
                }
            } else {
                // 如果是目录,空的不要
                if (treeNode.getChildren().size() > 0) {
                    result.add(treeNode);
                }
            }
        }
        return result;
    }
}
