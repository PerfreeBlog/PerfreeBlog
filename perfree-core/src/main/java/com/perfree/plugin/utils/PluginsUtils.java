package com.perfree.plugin.utils;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.io.file.FileWriter;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.setting.dialect.Props;
import com.perfree.plugin.PluginHolder;
import com.perfree.plugin.PluginInfo;
import org.pf4j.PluginState;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.InputStream;
import java.net.JarURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * @description 插件相关工具
 * @author Perfree
 * @date 2021/8/13 11:56
 */
@Component
public class PluginsUtils {
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
                File tempFile = new File(file.getAbsolutePath() + "/plugin.properties");
                FileWriter writer = new FileWriter(tempFile);
                writer.write(read);
                return new Props(tempFile, CharsetUtil.CHARSET_UTF_8);
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

    public static <T> List<T> getAllPluginProxyClass(Class<T> clazz) {
        List<T> result = new ArrayList<>();
        Map<String, PluginInfo> allPlugin = PluginHolder.getAllPlugin();
        for (String key : allPlugin.keySet()) {
            PluginInfo pluginInfo = allPlugin.get(key);
            if (!pluginInfo.getPluginWrapper().getPluginState().equals(PluginState.STARTED)){
                continue;
            }
            T pluginBean = pluginInfo.getPluginBean(clazz);
            if (pluginBean != null) {
                result.add(pluginBean);
            }
        }
        return result;
    }
}
