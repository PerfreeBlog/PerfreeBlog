package com.perfree.commons.utils;

import org.dromara.hutool.core.io.resource.ClassPathResource;

import java.io.File;

public class ClassPathFileUtil {

    public static File getClassPathFile(String path) {
        try{
            return new ClassPathResource(path).getFile();
        }catch (Exception e) {
            return null;
        }
    }
}
