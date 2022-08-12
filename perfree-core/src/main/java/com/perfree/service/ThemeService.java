package com.perfree.service;

import cn.hutool.setting.dialect.Props;
import com.perfree.model.Theme;
import com.perfree.model.ThemeFile;
import com.perfree.model.TreeNode;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;

/**
 * @description ThemeService
 * @author Perfree
 * @date 2021/11/15 10:28
 */
public interface ThemeService {

    /**
     * 获取所有主题
     * @return List<Theme>
     */
    List<Theme> getAllTheme();

    /**
     * 切换主题
     * @param theme theme
     * @return int
     */
    int switchTheme(Theme theme);

    /**
     * 安装主题
     * @param multiFile multiFile
     * @return boolean
     */
    boolean addTheme(MultipartFile multiFile) throws Exception;

    /**
     * 卸载主题
     * @param theme theme
     * @return boolean
     */
    boolean delTheme(Theme theme);

    File getThemeDir(String path);

    Theme getThemeByPath(String path);

    /**
     * 根据主题获取主题内文件列表
     * @param path path
     * @return List<ThemeFile>
     */
    List<TreeNode> getFileListByTheme(String path);

    ThemeFile createFileOrDir(String fileName, String theme, String filePath, String type, String path);

    HashMap<String, Object> reNameFile(String filePath, String newName, String theme, String id, String path);

    boolean createTheme(Theme theme);

    List<String> getPageTplByTheme(String currentTheme);

    void nodeThemeHandle(Theme themeByPath, File themeDir);

}
