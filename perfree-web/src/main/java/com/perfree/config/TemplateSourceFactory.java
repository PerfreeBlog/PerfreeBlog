package com.perfree.config;

import cn.hutool.core.io.FileUtil;
import com.jfinal.template.source.FileSource;
import com.jfinal.template.source.ISource;
import com.jfinal.template.source.ISourceFactory;
import com.perfree.common.Constants;

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

        File pluginsFile = new File(Constants.PLUGINS_DIR + s1);
        if (pluginsFile.exists()) {
            return new FileSource(Constants.PLUGINS_DIR, s1, s2);

        }

        File projectFile = new File(FileUtil.file("").getAbsolutePath() + s1);
        if (projectFile.exists()) {
            return new FileSource(FileUtil.file("").getAbsolutePath(), s1, s2);
        }
        return null;
    }
}
