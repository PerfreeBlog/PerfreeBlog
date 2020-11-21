package com.perfree.service;

import com.perfree.model.Theme;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;
import sun.misc.IOUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

@Service
public class ThemeService {
    public List<Theme> getAllTheme() throws Exception {
        File file = new File("themes/perfree/settings.properties");
        System.out.println(file.getAbsolutePath());
        return null;
    }

    public static void main(String[] args) throws Exception {
        new ThemeService().getAllTheme();
    }
}
