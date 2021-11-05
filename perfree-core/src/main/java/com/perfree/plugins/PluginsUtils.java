package com.perfree.plugins;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.setting.dialect.Props;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.JarURLConnection;
import java.net.URL;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * @description 插件相关工具
 * @author Perfree
 * @date 2021/8/13 11:56
 */
@Component
public class PluginsUtils{
    /**
     * @description 加载插件配置文件
     * @param jarFile jarFile
     * @author Perfree
     */
    public static Props getSetting(File jarFile) throws Exception {
        Enumeration<JarEntry> entries = new JarFile(jarFile).entries();
        while (entries.hasMoreElements()) {
            JarEntry jarEntry = entries.nextElement();
            String entryName = jarEntry.getName();
            if (entryName.equals("plugin.properties")) {
                URL url = new URL("jar:file:" + jarFile.getPath() + "!/" + entryName);
                JarURLConnection jarConnection = (JarURLConnection) url.openConnection();
                InputStream in = jarConnection.getInputStream();
                String read = IoUtil.read(in, CharsetUtil.UTF_8);
                in.close();
                JarFile currJarFile = jarConnection.getJarFile();
                currJarFile.close();
                File file = new File("resources/temp");
                if (!file.exists()) {
                    if (!file.mkdirs()) {
                        throw new IOException("加载插件:临时目录创建失败");
                    }
                }
                File tempFile = new File(file.getAbsolutePath() + "/plugin.properties");
                FileWriter writer = new FileWriter(tempFile);
                writer.write(read);
                writer.flush();
                writer.close();
                Props props = new Props(tempFile, CharsetUtil.CHARSET_UTF_8);
                if (props.isEmpty()) {
                    throw new Exception("加载插件:插件内配置文件无内容");
                }
                return props;
            }
        }
        throw new Exception("加载插件:读取配置文件失败");
    }

    /**
     * @description 强制删除
     * @author Perfree
     */
    public static void forceDelete(File file) {
        if (!file.exists()) {
            return;
        }
        boolean result = file.delete();
        if (result) {
            return;
        }
        int tryCount = 0;
        while (!result && tryCount++ < 5) {
            System.gc();
            try {
                Thread.sleep(150);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            result = file.delete();
        }
    }
}
