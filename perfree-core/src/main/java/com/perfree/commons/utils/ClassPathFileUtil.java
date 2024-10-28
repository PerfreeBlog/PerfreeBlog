package com.perfree.commons.utils;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.resource.ClassPathResource;
import com.perfree.commons.constant.SystemConstants;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.StandardCopyOption;

public class ClassPathFileUtil {

    public static File getClassPathFile(String path) {
        ClassPathResource classPathResource = new ClassPathResource(path);
        try{
            return classPathResource.getFile();
        }catch (Exception e) {
            try (InputStream inputStream = classPathResource.getStream()) {
                String targetPath = SystemConstants.UPLOAD_TEMP_PATH + SystemConstants.FILE_SEPARATOR + path.replace("classpath:", "");
                return FileUtil.copyFile(inputStream, new File(targetPath), StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException ex) {
                return null;
            }
        }
    }

    public static File getDevClassPathFile(String path) {
        try{
            return new ClassPathResource(path).getFile();
        }catch (Exception e) {
            return null;
        }
    }
}
