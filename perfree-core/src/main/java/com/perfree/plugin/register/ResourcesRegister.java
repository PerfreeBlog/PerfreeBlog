package com.perfree.plugin.register;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.io.file.FileWriter;
import cn.hutool.core.util.CharsetUtil;
import com.perfree.common.Constants;
import com.perfree.plugin.PluginInfo;

import java.io.File;
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
public class ResourcesRegister implements PluginRegister{
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
                       && !jarEntryName.endsWith(".class")) {
                   URL url = new URL("jar:file:" + jarFile.getAbsolutePath() + "!/" + jarEntryName);
                   JarURLConnection jarConnection = (JarURLConnection) url.openConnection();
                   InputStream in = jarConnection.getInputStream();
                   String read = IoUtil.read(in, CharsetUtil.UTF_8);
                   in.close();
                   JarFile currJarFile = jarConnection.getJarFile();
                   currJarFile.close();


                   File staticFile = new File(file.getAbsolutePath() + File.separator + jarEntryName);
                   FileWriter writer = new FileWriter(staticFile);
                   writer.write(read);
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
