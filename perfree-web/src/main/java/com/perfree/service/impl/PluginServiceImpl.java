package com.perfree.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.setting.dialect.Props;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.commons.*;
import com.perfree.config.EnjoyConfig;
import com.perfree.mapper.PluginsMapper;
import com.perfree.model.Plugin;
import com.perfree.plugin.PluginEvent;
import com.perfree.plugin.PluginHolder;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginManager;
import com.perfree.plugin.utils.PluginsUtils;
import com.perfree.service.PluginService;
import org.apache.commons.lang3.StringUtils;
import org.pf4j.PluginState;
import org.pf4j.PluginWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.List;

@Service
public class PluginServiceImpl implements PluginService {
    private final Logger logger = LoggerFactory.getLogger(PluginServiceImpl.class);
    @Autowired
    private PluginsMapper pluginsMapper;

    @Autowired
    private PluginManager pluginManager;

    @Value("${version}")
    private String version;


    /**
     * @description  添加插件
     * @param multiFile  multiFile
     * @return boolean
     * @author Perfree
     */
    public ResponseBean addPlugin(MultipartFile multiFile){
        File file = null;
        try{
            String multiFileName = multiFile.getOriginalFilename();
            File dir = new File(Constants.UPLOAD_TEMP_PATH);
            if (!dir.exists()){
                boolean mkdirs = dir.mkdirs();
                if (!mkdirs) {
                    return ResponseBean.fail("创建临时目录失败", null);
                }
            }
            file = new File(Constants.UPLOAD_TEMP_PATH + Constants.SEPARATOR + multiFileName);
            if (file.exists()) {
                FileUtil.del(file.getAbsoluteFile());
            }
            // 将插件存储至临时目录
            multiFile.transferTo(file.getAbsoluteFile());
            // 读取插件配置文件
            Props setting = PluginsUtils.getSetting(file);
            if (setting.isEmpty()) {
                return ResponseBean.fail("插件安装失败:插件内无配置文件", null);
            }
            //plugin.minimal.version
            String minimalVersion = setting.getStr("plugin.minimal.version", "");
            if (StringUtils.isNotBlank(minimalVersion) && StringUtil.versionToLong(minimalVersion) > StringUtil.versionToLong(version)){
                return ResponseBean.fail("插件安装失败:该插件最低需要" + minimalVersion + "版本的PerfreeBlog", null);
            }

            String database = setting.getStr("plugin.database", "");
            if (StringUtils.isNotBlank(database) && !database.contains(DynamicDataSource.dataSourceType)) {
                return ResponseBean.fail("插件安装失败:该插件不支持" + DynamicDataSource.dataSourceType + "数据库", null);
            }

            File pluginFile = new File(Constants.PLUGIN_PATH + Constants.SEPARATOR + multiFileName);
            boolean isUpdate = false;
            PluginWrapper plugin = pluginManager.getPlugin(setting.getStr("plugin.id"));
            if (plugin != null) {
                long oldVersion = StringUtil.versionToLong(plugin.getDescriptor().getVersion());
                long newVersion = StringUtil.versionToLong(setting.getStr("plugin.version"));

                if (oldVersion == newVersion) {
                    return ResponseBean.fail("插件安装失败:该版本插件已经安装,请勿再次安装", null);
                } else if (oldVersion > newVersion) {
                    return ResponseBean.fail("插件安装失败:更高版本的插件已存在,请勿再次安装低版本插件", null);
                } else {
                    isUpdate = true;
                }
            }

            // 如果判定为更新插件逻辑,则进行更新逻辑处理
            if (isUpdate) {
                pluginUpdateHandle(setting, plugin, file, pluginFile);
                return ResponseBean.success("插件更新成功",null);
            }
            FileUtil.copy(file.getAbsoluteFile(), pluginFile.getAbsoluteFile(),true);
            // 安装插件
            PluginInfo pluginInfo = pluginManager.install(pluginFile.toPath().toAbsolutePath());
            // 执行安装方法
            pluginManager.handleEvent(Constants.PLUGIN_EVENT_INSTALL, pluginInfo);
            // 安装后置操作
            pluginManager.installAfter(pluginInfo.getPluginId());
            savePlugin(pluginInfo, pluginFile);
            return ResponseBean.success("插件安装成功",null);
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("插件安装失败:{}", e.getMessage());
            return ResponseBean.fail("插件安装失败:" + e.getMessage(), e.getMessage());
        } finally {
            if (file != null && file.exists()) {
                PluginsUtils.forceDelete(file);
            }
        }
    }

    /**
     * 插件更新逻辑处理
     */
    private void pluginUpdateHandle(Props newPluginSetting, PluginWrapper oldPluginWrapper, File uploadFile, File pluginFile) throws Exception {
        boolean isStart = oldPluginWrapper.getPluginState().equals(PluginState.STARTED);
        pluginManager.unInstall(oldPluginWrapper.getPluginId(), true);
        FileUtil.copy(uploadFile.getAbsoluteFile(), pluginFile.getAbsoluteFile(),true);
        PluginInfo pluginInfo = pluginManager.install(pluginFile.toPath().toAbsolutePath());
        // 执行更新方法
        pluginManager.handleEvent(Constants.PLUGIN_EVENT_UPDATE, pluginInfo);
        // 执行后置操作
        pluginManager.installAfter(pluginInfo.getPluginId());
        // 如果之前已经启动,则需要同时启动
        if (isStart) {
            pluginManager.startPlugin(pluginInfo.getPluginId());
        }
        Plugin plugin = pluginsMapper.getByName(pluginInfo.getPluginWrapper().getDescriptor().getPluginId());
        plugin.setAuthor(pluginInfo.getPluginWrapper().getDescriptor().getProvider());
        plugin.setDesc(pluginInfo.getPluginWrapper().getDescriptor().getPluginDescription());
        plugin.setPath(pluginFile.getName());
        plugin.setName(pluginInfo.getPluginId());
        plugin.setVersion(pluginInfo.getPluginWrapper().getDescriptor().getVersion());
        plugin.setUpdateTime(new Date());
        pluginsMapper.update(plugin);
    }


    /**
     * @description 保存插件信息
     * @author Perfree
     */ 
    private void savePlugin(PluginInfo pluginInfo , File file) {
        Plugin plugin = new Plugin();
        plugin.setAuthor(pluginInfo.getPluginWrapper().getDescriptor().getProvider());
        plugin.setDesc(pluginInfo.getPluginWrapper().getDescriptor().getPluginDescription());
        plugin.setPath(file.getName());
        plugin.setName(pluginInfo.getPluginId());
        plugin.setVersion(pluginInfo.getPluginWrapper().getDescriptor().getVersion());
        plugin.setCreateTime(new Date());
        plugin.setStatus(Constants.PLUGIN_STATUS_DISABLE);
        pluginsMapper.save(plugin);
    }

    /** 
     * @description 插件列表
     * @author Perfree
     */ 
    public Pager<Plugin> list(Pager<Plugin> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Plugin> plugins = pluginsMapper.getList(pager.getForm());
        PageInfo<Plugin> pageInfo = new PageInfo<>(plugins);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }

    /**
     * @description 卸载插件
     * @return boolean
     * @author Perfree
     */
    public boolean del(String id) {
        try {
            Plugin plugin = pluginsMapper.getById(id);
            File file = new File(Constants.PLUGIN_PATH + File.separator + plugin.getPath());
            // 如果插件文件不存在,则证明为冗余数据,直接清除数据库内容
            if (!file.exists()) {
                pluginsMapper.delById(plugin.getId());
                return true;
            }
            // 卸载插件
            pluginManager.unInstall(plugin.getName(), false);
            pluginsMapper.delById(plugin.getId());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("插件卸载失败:{}", e.getMessage());
            return false;
        }
    }

    /**
     * @description 获取所有插件
     * @author Perfree
     */
    public List<Plugin> getAll() {
        return pluginsMapper.getAll();
    }

    @Override
    public boolean startPlugin(String id) {
        Plugin plugin = pluginsMapper.getById(id);
        PluginState pluginState = pluginManager.startPlugin(plugin.getName());
        boolean result = pluginState != null && pluginState.equals(PluginState.STARTED);
        if (result) {
            plugin.setStatus(Constants.PLUGIN_STATUS_ENABLE);
            pluginsMapper.update(plugin);
        }
        return result;
    }

    @Override
    public boolean stopPlugin(String id) {
        Plugin plugin = pluginsMapper.getById(id);
        PluginState pluginState = pluginManager.stopPlugin(plugin.getName());
        boolean result = pluginState != null && pluginState.equals(PluginState.STOPPED);
        if (result) {
            plugin.setStatus(Constants.PLUGIN_STATUS_DISABLE);
            pluginsMapper.update(plugin);
        }
        return result;
    }

    @Override
    public Plugin getById(String id) {
        return pluginsMapper.getById(id);
    }

    @Override
    public Plugin getByName(String id) {
        return pluginsMapper.getByName(id);
    }
}
