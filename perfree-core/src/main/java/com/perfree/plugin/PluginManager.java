package com.perfree.plugin;

import com.perfree.commons.Constants;
import com.perfree.model.Plugin;
import com.perfree.plugin.handle.compound.LoadPluginHandle;
import com.perfree.plugin.handle.compound.StartPluginHandle;
import com.perfree.plugin.utils.PluginsUtils;
import org.apache.commons.lang3.StringUtils;
import org.pf4j.DefaultPluginManager;
import org.pf4j.PluginState;
import org.pf4j.PluginWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

/**
 * 插件管理
 * @author Perfree
 */
public class PluginManager extends DefaultPluginManager implements PluginManagerService, ApplicationContextAware {

    private final static Logger LOGGER = LoggerFactory.getLogger(PluginManager.class);
    @Autowired
    private LoadPluginHandle loadPluginHandle;

    @Autowired
    private StartPluginHandle startPluginHandle;

    ApplicationContext applicationContext;


    public PluginManager(Path... pluginsRoots) {
        super(pluginsRoots);
    }


    /**
     * 安装插件
     * @param path 插件路径
     * @return PluginInfo
     * @throws Exception exception
     */
    @Override
    public PluginInfo install(Path path) throws Exception {
        String pluginId = null;
        try {
            pluginId = this.loadPlugin(path);
            super.startPlugin(pluginId);
            LOGGER.info("install plugin [{}] success", pluginId);
            return PluginHolder.getPlugin(pluginId);
        } catch (Exception e) {
            e.printStackTrace();
            if(StringUtils.isNotBlank(pluginId)) {
                PluginHolder.remove(pluginId);
            }
            throw new Exception(e.getMessage());
        }
    }

    /**
     * 安装插件后置操作
     * @param pluginId pluginId
     */
    @Override
    public void installAfter(String pluginId) {
        try{
            PluginInfo plugin = PluginHolder.getPlugin(pluginId);
            loadPluginHandle.unRegistry(plugin);
            super.stopPlugin(pluginId);
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("install plugin after error:{}", e.getMessage());
        }
    }

    /**
     * 启动插件
     * @param pluginId pluginId
     * @return PluginState
     */
    public PluginState startPlugin(String pluginId){
        PluginState pluginState = null;
        try{
            PluginInfo plugin = PluginHolder.getPlugin(pluginId);
            startPluginHandle.registry(plugin);
            pluginState = super.startPlugin(pluginId);
            // 启动事件
            handleEvent(Constants.PLUGIN_EVENT_START, plugin);
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("plugin start error : {}", e.getMessage());
        }
        return pluginState;
    }

    /**
     * 停止插件
     * @param pluginId pluginId
     * @return PluginState
     */
    public PluginState stopPlugin(String pluginId) {
        PluginState pluginState = null;
        try{
            PluginInfo plugin = PluginHolder.getPlugin(pluginId);
            // 停止事件
            handleEvent(Constants.PLUGIN_EVENT_STOP, plugin);
            startPluginHandle.unRegistry(plugin);
            pluginState = super.stopPlugin(pluginId, true);
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("plugin stop error : {}", e.getMessage());
        }
        return pluginState;
    }

    /**
     * 卸载插件
     * @param pluginId 插件Id
     * @throws Exception Exception
     */
    @Override
    public void unInstall(String pluginId, boolean isUpdate) throws Exception {
        LOGGER.info("unInstallPlugin:" + pluginId);
        PluginInfo plugin = PluginHolder.getPlugin(pluginId);

        if(plugin != null) {
            try {
                PluginState pluginState = plugin.getPluginWrapper().getPluginState();
                if (pluginState.equals(PluginState.STARTED)) {
                    if (!isUpdate) {
                        handleEvent(Constants.PLUGIN_EVENT_UNINSTALL, plugin);
                    }
                    startPluginHandle.unRegistry(plugin);
                } else {
                    if (!isUpdate) {
                        loadPluginHandle.registry(plugin);
                        handleEvent(Constants.PLUGIN_EVENT_UNINSTALL, plugin);
                    }
                    loadPluginHandle.unRegistry(plugin);
                }
                plugin.clearApplicationContext();
                PluginHolder.remove(pluginId);
                if(!unloadPlugin(pluginId, true)) {
                    throw new Exception("plugin [" + pluginId + "] 卸载失败");
                }
                PluginsUtils.forceDelete(plugin.getPluginWrapper().getPluginPath().toFile());
            } catch (Exception e) {
                e.printStackTrace();
                throw new Exception(e.getMessage());
            }
        }
    }

    /**
     * 插件事件处理
     * @param type 事件类型
     * @param pluginInfo 插件信息
     */
    public void handleEvent(int type, PluginInfo pluginInfo){
        LOGGER.info("plugin event type: {}, pluginIid :{}" ,type, pluginInfo.getPluginId());
        PluginEvent pluginBean = pluginInfo.getPluginBean(PluginEvent.class);
        // 如果存在该类的实现,证明为老版本(2.2.0以下)插件,走老版本插件处理逻辑
        if (pluginBean != null) {
            handleOldEvent(type, pluginBean);
            return;
        }
        // 新版本(2.2.0以上)
        BasePluginEvent basePluginEvent = pluginInfo.getPluginBean(BasePluginEvent.class);
        if (basePluginEvent == null) {
            return;
        }
        switch (type) {
            case Constants.PLUGIN_EVENT_INSTALL:
                basePluginEvent.onInstall();
                break;
            case Constants.PLUGIN_EVENT_UPDATE:
                basePluginEvent.onUpdate();
                break;
            case Constants.PLUGIN_EVENT_START:
                basePluginEvent.onStart();
                break;
            case Constants.PLUGIN_EVENT_STOP:
                basePluginEvent.onStop();
                break;
            case Constants.PLUGIN_EVENT_UNINSTALL:
                basePluginEvent.onUnInstall();
                break;
        }
    }

    /**
     * 老版本插件事件处理
     * @param type 事件类型
     * @param pluginBean 插件事件类
     */
    private void handleOldEvent(int type, PluginEvent pluginBean) {
        switch (type) {
            case Constants.PLUGIN_EVENT_INSTALL:
                pluginBean.onInstall();
                break;
            case Constants.PLUGIN_EVENT_STOP:
                break;
            case Constants.PLUGIN_EVENT_START:
                pluginBean.onStart();
                break;
            case Constants.PLUGIN_EVENT_UPDATE:
                pluginBean.onUpdate();
                break;
            case Constants.PLUGIN_EVENT_UNINSTALL:
                pluginBean.onUnInstall();
                break;
        }
    }

    /**
     * 初始化所有插件
     * @throws Exception Exception
     */
    @Override
    public void initPlugins(List<Plugin> plugins) throws Exception {
        // 初始化插件处理器
        loadPluginHandle.initialize();
        startPluginHandle.initialize();
        for (Plugin plugin : plugins) {
            File file = new File(Constants.PLUGINS_DIR + Constants.SEPARATOR + plugin.getPath());
            if (!file.exists()) {
                continue;
            }
            String pluginId = this.loadPlugin(file.toPath().toAbsolutePath());
            PluginInfo pluginInfo = PluginHolder.getPlugin(pluginId);
            loadPluginHandle.unRegistry(pluginInfo);
            if (plugin.getStatus() == 1) {
                this.startPlugin(pluginInfo.getPluginId());
            }
        }
    }

    /**
     * 获取所有已安装的插件
     * @return List<PluginWrapper>
     */
    @Override
    public List<PluginWrapper> getInstallPlugins() {
        return getPlugins();
    }

    /**
     * 加载插件
     * @param pluginPath 插件路径
     * @return String
     */
    @Override
    public String loadPlugin(Path pluginPath) {
        if ((pluginPath == null) || Files.notExists(pluginPath)) {
            throw new IllegalArgumentException(String.format("plugin %s does not exist!", pluginPath));
        }
        LOGGER.info("Loading plugin from '{}'", pluginPath);
        PluginWrapper pluginWrapper = loadPluginFromPath(pluginPath);
        try {
            resolvePlugins();
            PluginInfo plugin = new PluginInfo(pluginWrapper, applicationContext);
            loadPluginHandle.registry(plugin);
            PluginHolder.put(pluginWrapper.getPluginId(), plugin);
        } catch (Exception e) {
            unloadPlugin(pluginWrapper.getPluginId());
        }
        return pluginWrapper.getDescriptor().getPluginId();
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    /** 
     * @description 根据插件id获取插件信息
     * @param pluginId 插件id
     * @return com.perfree.plugin.PluginInfo 
     * @author Perfree
     */ 
    public PluginInfo getPluginInfoById(String pluginId){
        return PluginHolder.getPlugin(pluginId);
    }
}
