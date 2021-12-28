package com.perfree.plugin.handle;

import cn.hutool.core.io.FileUtil;
import com.perfree.commons.Constants;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.handle.base.BasePluginHandle;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.JarURLConnection;
import java.net.URL;
import java.util.Enumeration;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * @description 处理ClassPath静态资源
 * @author Perfree
 * @date 2021/11/13 10:09
 */
public class ResourcesHandle implements BasePluginHandle {
    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        String pluginPath = plugin.getPluginWrapper().getPluginPath().toString();
        Set<String> staticClassPathLocations = plugin.getStaticClassPathLocations();

        File jarFile = new File(pluginPath);
        Enumeration<JarEntry> jarEntries = new JarFile(jarFile).entries();
        File file = new File(Constants.PLUGINS_RESOURCES_DIR + File.separator + plugin.getPluginId());
        if (file.exists()){
            FileUtil.mkdir(file);
        }
        FileUtil.clean(file);
        while (jarEntries.hasMoreElements()) {
            JarEntry entry = jarEntries.nextElement();
            String jarEntryName = entry.getName();
            for (String staticClassPathLocation : staticClassPathLocations) {
               if (!staticClassPathLocation.equals(jarEntryName) && jarEntryName.startsWith(staticClassPathLocation)
                       && !jarEntryName.endsWith(".class") && !entry.isDirectory()) {
                   URL url = new URL("jar:file:" + jarFile.getAbsolutePath() + "!/" + jarEntryName);
                   JarURLConnection jarConnection = (JarURLConnection) url.openConnection();
                   InputStream in = jarConnection.getInputStream();

                   File file1 = new File(file.getAbsolutePath() + File.separator + jarEntryName);
                   FileUtil.touch(file1.getAbsolutePath());
                   int index;
                   byte[] bytes = new byte[1024];
                   FileOutputStream downloadFile = new FileOutputStream(file.getAbsolutePath() + File.separator + jarEntryName);
                   while ((index = in.read(bytes)) != -1) {
                       downloadFile.write(bytes, 0, index);
                       downloadFile.flush();
                   }
                   downloadFile.close();
                   in.close();
                   JarFile currJarFile = jarConnection.getJarFile();
                   currJarFile.close();
               }
            }
        }
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        File file = new File(Constants.PLUGINS_RESOURCES_DIR + File.separator + plugin.getPluginId());
        if (file.exists()){
            FileUtil.del(file.getAbsolutePath());
        }
    }
}
