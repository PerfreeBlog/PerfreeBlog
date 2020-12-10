package com.perfree.config;

import cn.hutool.core.io.FileUtil;
import com.jfinal.template.source.FileSource;
import com.jfinal.template.source.ISource;
import com.jfinal.template.source.ISourceFactory;

import java.io.File;

/**
 * TemplateSource Configuration
 *
 * @author Perfree
 */
public class TemplateSourceFactory implements ISourceFactory {
    private static final String RESOURCES_DIR = "resources";
    private static final String PLUGINS_DIR = "resources/plugins";

    @Override
    public ISource getSource(String s, String s1, String s2) {
        File file = new File(RESOURCES_DIR + s1);
        File pluginsFile = new File(PLUGINS_DIR + s1);
        if (file.exists()) {
            return new FileSource(RESOURCES_DIR, s1, s2);
        } else if (pluginsFile.exists()) {
            return new FileSource(PLUGINS_DIR, s1, s2);

        } else {
            return new FileSource(FileUtil.file("").getAbsolutePath(), s1, s2);
        }
    }
}
