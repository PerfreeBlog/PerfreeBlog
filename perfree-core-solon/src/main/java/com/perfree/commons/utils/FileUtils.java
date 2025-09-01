package com.perfree.commons.utils;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileUtils {

    private final static Logger LOGGER = LoggerFactory.getLogger(FileUtils.class);

    // 创建文件
    public static boolean createFile(String filePath) {
        try {
            File file = new File(filePath);
            if (file.exists()) {
                LOGGER.error("文件已存在: {}", filePath);
                return false;
            }
            File parentDir = file.getParentFile();
            if (parentDir != null && !parentDir.exists()) {
                parentDir.mkdirs(); // 创建父目录
            }
            return file.createNewFile();
        } catch (IOException e) {
            LOGGER.error("创建文件失败: {}", filePath, e);
            return false;
        }
    }

    // 删除文件或文件夹
    public static boolean deleteFile(String filePath) {
        try {
            File file = new File(filePath);
            if (!file.exists()) {
                LOGGER.error("文件不存在: {}", filePath);
                return false;
            }

            if (file.isDirectory()) {
                return deleteDirectory(file);
            } else {
                return file.delete();
            }
        } catch (Exception e) {
            LOGGER.error("删除文件失败: {}", filePath, e);
            return false;
        }
    }

    // 递归删除文件夹
    private static boolean deleteDirectory(File directory) {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteDirectory(file);
                } else {
                    file.delete();
                }
            }
        }
        return directory.delete();
    }

    // 复制文件或文件夹，参数：是否覆盖
    public static boolean copyFile(String sourcePath, String targetPath, boolean overwrite) {
        try {
            File source = new File(sourcePath);
            File target = new File(targetPath);

            if (target.exists() && !overwrite) {
                LOGGER.error("目标文件已存在且未设置覆盖: {}", targetPath);
                return false;
            }

            if (source.isDirectory()) {
                return copyDirectory(source, target, overwrite);
            } else {
                Files.copy(source.toPath(), target.toPath(),
                        overwrite ? StandardCopyOption.REPLACE_EXISTING : StandardCopyOption.COPY_ATTRIBUTES);
            }
            return true;
        } catch (IOException e) {
            LOGGER.error("复制文件失败: {} -> {}", sourcePath, targetPath, e);
            return false;
        }
    }

    // 递归复制文件夹
    private static boolean copyDirectory(File sourceDir, File targetDir, boolean overwrite) throws IOException {
        if (!targetDir.exists()) {
            targetDir.mkdirs();
        }
        File[] files = sourceDir.listFiles();
        if (files != null) {
            for (File file : files) {
                File targetFile = new File(targetDir, file.getName());
                if (file.isDirectory()) {
                    copyDirectory(file, targetFile, overwrite);
                } else {
                    Files.copy(file.toPath(), targetFile.toPath(),
                            overwrite ? StandardCopyOption.REPLACE_EXISTING : StandardCopyOption.COPY_ATTRIBUTES);
                }
            }
        }
        return true;
    }

    // 移动文件或文件夹，参数：是否覆盖
    public static boolean moveFile(String sourcePath, String targetPath, boolean overwrite) {
        try {
            File source = new File(sourcePath);
            File target = new File(targetPath);

            if (target.exists() && !overwrite) {
                LOGGER.error("目标文件已存在且未设置覆盖: {}", targetPath);
                return false;
            }

            if (source.isDirectory()) {
                return moveDirectory(source, target, overwrite);
            } else {
                Files.move(source.toPath(), target.toPath(),
                        overwrite ? StandardCopyOption.REPLACE_EXISTING : StandardCopyOption.ATOMIC_MOVE);
            }
            return true;
        } catch (IOException e) {
            LOGGER.error("移动文件失败: {} -> {}", sourcePath, targetPath, e);
            return false;
        }
    }

    // 递归移动文件夹
    private static boolean moveDirectory(File sourceDir, File targetDir, boolean overwrite) throws IOException {
        if (!targetDir.exists()) {
            targetDir.mkdirs();
        }
        File[] files = sourceDir.listFiles();
        if (files != null) {
            for (File file : files) {
                File targetFile = new File(targetDir, file.getName());
                if (file.isDirectory()) {
                    moveDirectory(file, targetFile, overwrite);
                } else {
                    Files.move(file.toPath(), targetFile.toPath(),
                            overwrite ? StandardCopyOption.REPLACE_EXISTING : StandardCopyOption.ATOMIC_MOVE);
                }
            }
        }
        return sourceDir.delete(); // 删除源文件夹
    }
}


