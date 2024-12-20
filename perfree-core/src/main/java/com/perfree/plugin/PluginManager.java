package com.perfree.plugin;

import cn.hutool.core.io.FileUtil;
import com.perfree.commons.utils.VersionUtil;
import com.perfree.constant.PluginConstant;
import com.perfree.plugin.commons.PluginHandleUtils;
import com.perfree.plugin.commons.PluginSetting;
import com.perfree.plugin.exception.PluginException;
import com.perfree.plugin.handle.compound.PluginHandle;
import com.perfree.plugin.pojo.PluginBaseConfig;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;

/**
 * @author Perfree
 * @description 插件管理类,提供插件安装/卸载/运行/停止等方法
 * @date 15:36 2023/9/28
 */
@Component
@Slf4j
public class PluginManager{
    private static final Logger LOGGER = LoggerFactory.getLogger(PluginManager.class);

    @Value("${version}")
    private String version;

    @Resource
    private PluginHandle pluginHandle;

    /**
     * 运行插件
     * @author perfree
     * @date 2023-09-27 16:09:02
     * @param pluginDir 插件目录
     */
    public void runPlugin(File pluginDir) {
        try {
            PluginInfo pluginInfo = pluginHandle.startPlugin(pluginDir);
            BasePluginEvent bean = PluginApplicationContextHolder.getPluginBean(pluginInfo.getPluginId(), BasePluginEvent.class);
            if (null != bean) {
                bean.onStart();
            }
        } catch (Exception e) {
            LOGGER.error("plugin  ----->  start error:{}", e.getMessage(), e);
        }
    }

    /**
     * 停止插件
     * @author perfree
     * @date 2023-09-27 16:09:24
     * @param pluginId 插件id
     */
    public void stopPlugin(String pluginId) {
        try {
            PluginInfo pluginInfo = PluginInfoHolder.getPluginInfo(pluginId);
            BasePluginEvent bean = PluginApplicationContextHolder.getPluginBean(pluginInfo.getPluginId(), BasePluginEvent.class);
            if (null != bean) {
                bean.onStop();
            }
            pluginHandle.stopPlugin(pluginId);
        } catch (Exception e) {
            LOGGER.error("plugin  ----->  stop error:{}", e.getMessage(), e);
        }
    }

    /**
     * 安装插件
     * @param pluginFile pluginFile
     */
    public PluginBaseConfig installPlugin(File pluginFile) throws Exception {
        if (null == pluginFile || !pluginFile.exists()) {
            throw new PluginException("插件文件未找到!");
        }
        File pluginTempDir = PluginHandleUtils.extractZipPlugin(pluginFile);
        FileUtil.del(pluginFile);
        PluginBaseConfig pluginConfig = PluginHandleUtils.getPluginConfig(pluginTempDir);
        if (null == pluginConfig) {
            FileUtil.del(pluginTempDir);
            throw new PluginException("解析plugin.yaml失败!");
        }

        if (StringUtils.isNotBlank(pluginConfig.getPlugin().getMinimalVersion()) &&
                VersionUtil.versionToLong(pluginConfig.getPlugin().getMinimalVersion()) > VersionUtil.versionToLong(version)){
            FileUtil.del(pluginTempDir);
            throw new PluginException("插件安装失败:该插件最低需要" + pluginConfig.getPlugin().getMinimalVersion() + "版本的PerfreeBlog");
        }

        boolean update = false;
        PluginBaseConfig installedPluginConfig = PluginHandleUtils.getInstalledPluginConfig(pluginConfig.getPlugin().getId());
        if (null != installedPluginConfig) {
            long oldVersion = VersionUtil.versionToLong(installedPluginConfig.getPlugin().getVersion());
            long newVersion = VersionUtil.versionToLong(pluginConfig.getPlugin().getVersion());
            if (oldVersion == newVersion) {
                FileUtil.del(pluginTempDir);
                throw new PluginException("插件安装失败:该版本插件已经安装,请勿再次安装");
            } else if (oldVersion > newVersion) {
                FileUtil.del(pluginTempDir);
                throw new PluginException("插件安装失败:更高版本的插件已存在,请勿再次安装低版本插件");
            } else {
                update = true;
            }
        }

        if (update && PluginInfoHolder.getPluginInfo(pluginConfig.getPlugin().getId()) != null) {
            stopPlugin(pluginConfig.getPlugin().getId());
        }
        File pluginDir = PluginHandleUtils.copyPluginTempToPlugin(pluginTempDir, pluginConfig);
        FileUtil.del(pluginTempDir);
        PluginInfo pluginInfo = pluginHandle.startPlugin(pluginDir);
        BasePluginEvent bean = PluginApplicationContextHolder.getPluginBean(pluginInfo.getPluginId(), BasePluginEvent.class);
        if (update) {
            PluginHandleUtils.execPluginUpdateSql(pluginDir, installedPluginConfig.getPlugin().getVersion(), pluginConfig.getPlugin().getVersion());
            if (null != bean) {
                bean.onUpdate();
            }
            pluginConfig.setStatus(PluginConstant.PLUGIN_STATUS_ENABLE);
        } else {
            PluginHandleUtils.execPluginInstallSql(pluginDir);
            if (null != bean) {
                bean.onInstall();
            }
            pluginHandle.stopPlugin(pluginInfo.getPluginId());
            pluginConfig.setStatus(PluginConstant.PLUGIN_STATUS_DISABLE);
        }
        return pluginConfig;
    }

    /**
     * 卸载插件
     * @param pluginDirFile pluginDirFile
     */
    public void unInstallPlugin(File pluginDirFile) throws Exception {
        try{
            PluginInfo pluginInfo = pluginHandle.startPlugin(pluginDirFile);
            BasePluginEvent bean = PluginApplicationContextHolder.getPluginBean(pluginInfo.getPluginId(), BasePluginEvent.class);
            if (null != bean) {
                bean.onUnInstall();
            }
            pluginHandle.stopPlugin(pluginInfo.getPluginId());
            PluginHandleUtils.execPluginUnInstallSql(pluginDirFile);
        }catch (Exception e) {
            log.error("unInstall plugin error", e);
        }
        FileUtil.del(pluginDirFile);
    }

    /**
     * 获取插件设置项
     * @param pluginDirFile pluginDirFile
     * @return PluginSetting
     */
    public PluginSetting getPluginSetting(File pluginDirFile) {
        return PluginHandleUtils.getPluginSetting(pluginDirFile);
    }
}
