package com.perfree.plugin;

import cn.hutool.core.io.watch.SimpleWatcher;
import cn.hutool.core.io.watch.WatchMonitor;
import cn.hutool.core.io.watch.watchers.DelayWatcher;
import com.perfree.plugin.commons.PluginUtils;
import com.perfree.plugin.handle.compound.PluginHandle;
import com.perfree.plugin.pojo.PluginBaseConfig;
import org.apache.maven.model.Model;
import org.apache.maven.model.io.xpp3.MavenXpp3Reader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Path;
import java.nio.file.WatchEvent;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Perfree
 * @description 源码运行插件加载类
 * @date 15:36 2023/01/18
 */
@Component
public class PluginDevManager {
    private static final Logger LOGGER = LoggerFactory.getLogger(PluginDevManager.class);

    @Value("${perfree.plugin-dir}")
    private String pluginBaseDir;

    private final PluginHandle pluginHandle;
    private final PluginManager pluginManager;

    public PluginDevManager(PluginHandle pluginHandle, PluginManager pluginManager) {
        this.pluginHandle = pluginHandle;
        this.pluginManager = pluginManager;
    }

    /**
     * 初始化所有插件
     * @author perfree
     * @date 2023-09-27 16:09:44
     */
    public void initPlugins() throws Exception {
        List<String> plugins = getPluginClassPath();
        if (null == plugins || plugins.isEmpty()) {
            return;
        }
        for (String plugin : plugins) {
            initPlugin(plugin);
            WatchMonitor watchMonitor = WatchMonitor.createAll(plugin,  new DelayWatcher(new SimpleWatcher() {
                @Override
                public void onModify(WatchEvent<?> event, Path currentPath) {
                    try {
                        initPlugin(plugin);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            },1000));
            watchMonitor.start();
        }
    }

    /**
     * 初始化插件
     * @param pluginPath
     * @throws Exception
     */
    private void initPlugin(String pluginPath) throws Exception {
        File classes = new File(pluginPath + "/classes");
        if (!classes.exists()) {
            LOGGER.error("{} not found", pluginPath);
            return;
        }
        PluginBaseConfig pluginConfig = PluginUtils.getPluginConfig(classes, true);
        if (null == pluginConfig) {
            LOGGER.error("{} plugin.yaml not found", pluginPath);
            return;
        }
        Boolean update = PluginUtils.isUpdate(pluginConfig, pluginBaseDir);
        if (update && PluginInfoHolder.getPluginInfo(pluginConfig.getPlugin().getName()) != null) {
            pluginManager.stopPlugin(pluginConfig.getPlugin().getName());
        }
        File pluginDir = PluginUtils.devCopyPluginToPluginDir(pluginPath, pluginBaseDir);
        PluginInfo pluginInfo = pluginHandle.startPlugin(pluginDir);
        BasePluginEvent bean = PluginApplicationContextHolder.getPluginBean(pluginInfo.getPluginId(), BasePluginEvent.class);
        if (null != bean) {
            if (update) {
                bean.onUpdate();
            } else {
                bean.onInstall();
            }
        }
    }

    /**
     * 获取启用的插件
     * @return List<String>
     */
    private List<String> getEnablePlugin(File pluginsPom){
        try (FileInputStream fileInputStream = new FileInputStream(pluginsPom)) {
            MavenXpp3Reader mavenXpp3Reader = new MavenXpp3Reader();
            Model model = mavenXpp3Reader.read(fileInputStream);
            return model.getModules();
        } catch (Exception e) {
            LOGGER.error("Failed parse plugin pom.xml", e);
        }
        return null;
    }


    private List<String> getPluginClassPath() {
        String projectRootPath = System.getProperty("user.dir");
        File pluginsPom = new File(projectRootPath + "/perfree-plugins/pom.xml");
        File pluginsDir = new File(projectRootPath + "/perfree-plugins");
        File[] files = pluginsDir.listFiles();
        if (null == files){
            return null;
        }
        List<String> pluginPaths =  new ArrayList<>();
        List<String> enablePlugins = getEnablePlugin(pluginsPom);
        if (null == enablePlugins || enablePlugins.isEmpty()) {
            return null;
        }
        for (File file : files) {
            if (file.isDirectory()) {
                File pluginPom = new File(file.getAbsoluteFile() + "/pom.xml");
                String pluginArtifactId = getPluginArtifactId(pluginPom);
                if (enablePlugins.contains(pluginArtifactId)) {
                    pluginPaths.add(file.getAbsoluteFile() + "/target");
                }
            }
        }
        return pluginPaths;
    }

    /**
     * 获取插件ArtifactId
     * @param pomFilePath pomFilePath
     * @return String
     */
    private String getPluginArtifactId(File pomFilePath) {
        try (FileInputStream fileInputStream = new FileInputStream(pomFilePath)) {
            MavenXpp3Reader mavenXpp3Reader = new MavenXpp3Reader();
            Model model = mavenXpp3Reader.read(fileInputStream);
            return model.getArtifactId();
        } catch (Exception e) {
            LOGGER.error("Failed parse plugin pom.xml", e);
        }
        return null;
    }
}
