package com.perfree.service.impl;

import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.io.file.FileWriter;
import cn.hutool.core.io.resource.ClassPathResource;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.ZipUtil;
import cn.hutool.setting.dialect.Props;
import com.perfree.commons.Constants;
import com.perfree.commons.FileUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.model.Option;
import com.perfree.model.Theme;
import com.perfree.model.ThemeFile;
import com.perfree.model.TreeNode;
import com.perfree.service.OptionService;
import com.perfree.service.ThemeService;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
public class ThemeServiceImpl implements ThemeService {
    private final Logger logger = LoggerFactory.getLogger(ThemeService.class);
    @Autowired
    private OptionService optionService;

    /**
     * 获取所有主题
     * @return List<Theme>
     */
    public List<Theme> getAllTheme(){
        List<Theme> list = new ArrayList<>();
        File[] files = ArrayUtils.addAll(getThemeList(Constants.PROD_THEMES_PATH), getClassPathThemeList(Constants.DEV_THEMES_PATH));
        if (files == null) {
            return null;
        }
        for (File file : files) {
            File settingFile = new File(file.getAbsolutePath() + Constants.SEPARATOR + "theme.properties");
            if (settingFile.exists()){
                Props props = new Props(settingFile, CharsetUtil.UTF_8);
                Theme theme = new Theme();
                theme.setAuthor(props.get("author").toString());
                theme.setAuthorWebSite(props.get("author.web.site").toString());
                theme.setDescription(props.get("description").toString());
                theme.setName(props.get("name").toString());
                theme.setScreenshots("/static/themes/" + settingFile.getParentFile().getName() +
                        Constants.SEPARATOR + props.get("screenshots").toString());
                if (StringUtils.isBlank(props.get("screenshots").toString())) {
                    theme.setScreenshots("/static/public/images/error.png");
                }
                theme.setPath(settingFile.getParentFile().getName());
                if (settingFile.getParentFile().getName().equals(OptionCacheUtil.getValue(Constants.OPTION_WEB_THEME))){
                    theme.setIsActive(1);
                }
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
     * 根据目录读取ClassPath文件列表
     * @param path 路径
     * @return  File[]
     */
    private File[] getClassPathThemeList(String path) {
        try{
            return new ClassPathResource(path).getFile().listFiles();
        }catch (Exception e) {
            return null;
        }
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
        File settingFile = new File(unzip.getAbsolutePath() + "/theme.properties");
        if (settingFile.exists()){
            return true;
        }
        FileUtil.deleteDirectory(unzip);
        return false;
    }

    /**
     * node/vue/angular/react类型主题处理
     */
    public void nodeThemeHandle(Theme theme, File themeFile) {
        File[] files = themeFile.listFiles();
        if (null == files || files.length <= 0) {
            return;
        }
        File themeResources = new File(Constants.PROD_THEMES_RESOURCES_PATH);
        if (themeResources.exists()) {
            cn.hutool.core.io.FileUtil.clean(themeResources);
        } else {
            boolean mkdir = themeResources.mkdirs();
        }

        List<String> noCopyList = ListUtil.toLinkedList("theme.properties", "page", "index.html");
        if (StringUtils.isNotBlank(theme.getScreenshots())) {
            noCopyList.add(theme.getScreenshots());
        }
        for (File file : files) {
            if (!noCopyList.contains(file.getName())) {
                cn.hutool.core.io.FileUtil.copy(file.getAbsoluteFile(), themeResources.getAbsoluteFile(), true);
            }
        }
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
        File devThemeFile = FileUtil.getClassPathFile(Constants.DEV_THEMES_PATH + Constants.SEPARATOR + path);
        File themeFile = null;
        if (prodThemeFile.exists()) {
            themeFile = prodThemeFile;
        } else {
            if (devThemeFile != null && devThemeFile.exists()) {
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
        File settingFile = new File(themeDir.getAbsolutePath() + Constants.SEPARATOR + "theme.properties");
        if (settingFile.exists()){
            Props props = new Props(settingFile, CharsetUtil.UTF_8);
            theme.setName(props.getStr("name"));
            theme.setType(props.getStr("type"));
            theme.setVersion(props.getStr("version"));
            theme.setScreenshots(props.getStr("screenshots"));
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
        List<TreeNode> result = new ArrayList<>();
        return getFileListByFile(themeDir, path, result, "-1");
    }

    private List<TreeNode> getFileListByFile(File dir,String path, List<TreeNode> result, String pid) {
        File[] files = dir.listFiles();
        if (files == null || files.length <= 0) {
            return result;
        }
        for (File file : files) {
            ThemeFile themeFile = new ThemeFile();
            themeFile.setFilePath(file.getAbsolutePath());
            themeFile.setFileName(file.getName());
            themeFile.setPath(path + Constants.SEPARATOR + file.getName());

            TreeNode treeNode = new TreeNode();
            treeNode.setTitle(file.getName());
            treeNode.setId(IdUtil.simpleUUID());
            treeNode.setPid(pid);

            if (file.isDirectory()) {
                themeFile.setFileType("dir");
                getFileListByFile(file, themeFile.getPath(),result , treeNode.getId());
            } else {
                if (file.getName().contains(".")) {
                    themeFile.setFileType(file.getName().substring(file.getName().lastIndexOf(".")).replace(".",""));
                } else {
                    themeFile.setFileType("other");
                }
            }
            treeNode.setObj(themeFile);
            result.add(treeNode);
        }
        return result;
    }


    @Override
    public ThemeFile createFileOrDir(String fileName, String theme, String filePath, String type, String path) {
        String createPath;
        if (StringUtils.isBlank(filePath)) {
            File themeDir = getThemeDir(theme);
            createPath = themeDir.getAbsolutePath() + File.separator + fileName;
        } else {
            createPath =filePath + File.separator + fileName;
        }

        File file = new File(createPath);
        if (file.exists()) {
            return null;
        }
        File createFile;
        ThemeFile themeFile = new ThemeFile();
        if ("dir".equals(type)) {
            createFile = cn.hutool.core.io.FileUtil.mkdir(file.getAbsolutePath());
            themeFile.setFileType("dir");
        } else {
            createFile = cn.hutool.core.io.FileUtil.touch(file.getAbsolutePath());
            if (createFile.getName().contains(".")) {
                themeFile.setFileType(createFile.getName().substring(createFile.getName().lastIndexOf(".")).replace(".",""));
            } else {
                themeFile.setFileType("other");
            }

        }
        themeFile.setFilePath(createFile.getAbsolutePath());
        themeFile.setFileName(createFile.getName());
        themeFile.setPath(path + Constants.SEPARATOR + createFile.getName());
        return themeFile;
    }

    @Override
    public HashMap<String, Object> reNameFile(String filePath, String newName, String theme,String id, String path) {
        HashMap<String, Object> result = new HashMap<>();
        File file = new File(filePath);
        File rename = cn.hutool.core.io.FileUtil.rename(file.getAbsoluteFile(), newName, false);

        ThemeFile themeFile = new ThemeFile();
        themeFile.setFilePath(rename.getAbsolutePath());
        themeFile.setFileName(rename.getName());
        path = StrUtil.removeSuffix(path, file.getName()) + rename.getName();
        themeFile.setPath(path);
        TreeNode treeNode = new TreeNode();
        treeNode.setTitle(rename.getName());
        treeNode.setId(id);

        if (rename.isDirectory()) {
            themeFile.setFileType("dir");
        } else {
            if (rename.getName().contains(".")) {
                themeFile.setFileType(rename.getName().substring(rename.getName().lastIndexOf(".")).replace(".",""));
            } else {
                themeFile.setFileType("other");
            }
        }
        treeNode.setObj(themeFile);

        result.put("rename", treeNode);

        if (rename.isDirectory()) {
            List<TreeNode> children = new ArrayList<>();
            getFileListByFile(rename, path, children, id);
            result.put("children", children);
            return result;
        }
        return result;
    }

    @Override
    public boolean createTheme(Theme theme) {
        try{
            File themeFile = new File(Constants.PROD_THEMES_PATH + Constants.SEPARATOR + theme.getPath());
            File themeDir = cn.hutool.core.io.FileUtil.mkdir(themeFile.getAbsoluteFile());
            createHtml(themeDir.getAbsolutePath() + File.separator + "index.html", "首页");
            createHtml(themeDir.getAbsolutePath() + File.separator + "archive.html", "文章归档页");
            createHtml(themeDir.getAbsolutePath() + File.separator + "article.html", "文章页");
            createHtml(themeDir.getAbsolutePath() + File.separator + "articleList.html", "文章列表页");
            createHtml(themeDir.getAbsolutePath() + File.separator + "search.html", "文章搜索页");
            createHtml(themeDir.getAbsolutePath() + File.separator + "page.html", "通用页面");

            File pageDir = cn.hutool.core.io.FileUtil.mkdir(themeDir.getAbsolutePath() + File.separator + "page");
            createHtml(pageDir.getAbsolutePath() + File.separator + "link.html", "友链页");

            File themeProperties = cn.hutool.core.io.FileUtil.touch(themeDir.getAbsoluteFile(), "theme.properties");
            Props props = new Props(themeProperties.getAbsolutePath(), CharsetUtil.UTF_8);
            props.setProperty("name", theme.getName());
            props.setProperty("version", theme.getVersion());
            props.setProperty("author", theme.getAuthor());
            props.setProperty("author.web.site", theme.getAuthorWebSite());
            props.setProperty("description", theme.getDescription());
            props.setProperty("screenshots", "");
            props.setProperty("update.url", "");
            props.store(themeProperties.getAbsolutePath());
            return true;
        }catch (Exception e) {
            logger.error("创建主题:{}", e.getMessage());
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<String> getPageTplByTheme(String currentTheme) {
        List<String> pageTemplates = new ArrayList<>();
        File pageHtml = getThemeDir(currentTheme + "/page.html");
        if (pageHtml.exists()){
            pageTemplates.add("page.html");
        }

        File pageDir = getThemeDir(currentTheme + "/page");
        if (pageDir.exists() && pageDir.listFiles() != null) {
            for (File file : Objects.requireNonNull(pageDir.listFiles())) {
                pageTemplates.add("page/" + file.getName());
            }
        }
        return pageTemplates;
    }

    /**
     * @description 创建html
     * @author Perfree
     * @date 2021/12/11 16:31
     */
    private void createHtml(String path, String content){
        File html = cn.hutool.core.io.FileUtil.touch(path);
        FileWriter writer = new FileWriter(html.getAbsoluteFile());
        writer.write(content);
    }
}
