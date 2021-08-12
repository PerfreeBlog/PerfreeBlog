package com.perfree.config;

import cn.hutool.core.io.FileUtil;
import com.jfinal.template.source.FileSource;
import com.jfinal.template.source.ISource;
import com.jfinal.template.source.ISourceFactory;
import com.perfree.common.Constants;
import com.perfree.common.OptionCacheUtil;

import java.io.File;

/**
 * TemplateSource Configuration
 *
 * @author Perfree
 */
public class TemplateSourceFactory implements ISourceFactory {

    @Override
    public ISource getSource(String s, String s1, String s2) {
        File file = new File(Constants.RESOURCES_DIR + s1);
        if (file.exists()) {
            return new FileSource(Constants.RESOURCES_DIR, s1, s2);
        }

        File projectFile = new File(FileUtil.file("").getAbsolutePath() + s1);
        if (projectFile.exists()) {
            return new FileSource(FileUtil.file("").getAbsolutePath(), s1, s2);
        }
       String paths = view("/404.html", "/404.html",
               "/static/admin/pages/exception/404.html");
        File notFoundFile = new File(Constants.RESOURCES_DIR + paths);
        if (notFoundFile.exists()) {
            return new FileSource(Constants.RESOURCES_DIR, paths, s2);
        }
        File notFoundProjectFile = new File(FileUtil.file("").getAbsolutePath() + paths);
        if (notFoundProjectFile.exists()) {
            return new FileSource(FileUtil.file("").getAbsolutePath(), paths, s2);
        }
        return null;
    }

    public String view(String validPath, String themeViewPath, String adminViewPath) {
        File file = new File(Constants.PROD_THEMES_PATH + Constants.SEPARATOR +  OptionCacheUtil.getValue(Constants.OPTION_WEB_THEME) + validPath);
        File devFile = new File(Constants.DEV_THEMES_PATH + Constants.SEPARATOR +  OptionCacheUtil.getValue(Constants.OPTION_WEB_THEME) + validPath);
        if (file.exists() || devFile.exists()) {
            return view("static/themes/" +  OptionCacheUtil.getValue(Constants.OPTION_WEB_THEME) + themeViewPath);
        } else {
            return view(adminViewPath);
        }
    }

    public String view(String viewPath) {
        return viewPath;
    }
}
