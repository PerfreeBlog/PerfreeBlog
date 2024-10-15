package com.perfree.commons.utils;

import com.perfree.plugin.commons.PluginHandleUtils;

import java.io.File;

public class VersionUtil {


    /**
     * 判断更新文件是否在版本范围内
     *
     * @param file       file
     * @param oldVersion oldVersion
     * @param newVersion newVersion
     * @return boolean
     */
    public static boolean isWithinVersionRange(File file, String oldVersion, String newVersion) {
        String fileName = file.getName();
        String versionStr = fileName.substring("update-".length(), fileName.length() - ".sql".length());
        long currFileVersionNum = VersionUtil.versionToLong(versionStr);
        long oldVersionNum = VersionUtil.versionToLong(oldVersion);
        long newVersionNum = VersionUtil.versionToLong(newVersion);
        return currFileVersionNum > oldVersionNum && currFileVersionNum <= newVersionNum;
    }

    public static long versionToLong(String versionStr) {
        return Long.parseLong(versionStr.replaceAll("\r\n", "").replaceAll("--", "")
                .replaceAll("\\.", "").replace("v", ""));
    }


}
