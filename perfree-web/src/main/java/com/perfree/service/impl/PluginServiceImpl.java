package com.perfree.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.setting.dialect.Props;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.commons.Constants;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.config.EnjoyConfig;
import com.perfree.mapper.PluginsMapper;
import com.perfree.model.Plugin;
import com.perfree.plugin.PluginEvent;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginManager;
import com.perfree.plugin.utils.PluginsUtils;
import com.perfree.service.PluginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

            File pluginFile = new File(Constants.PLUGIN_PATH + Constants.SEPARATOR + multiFileName);
            boolean isUpdate = false;
            if (pluginFile.exists()) {
                isUpdate = true;
                pluginManager.unInstall(setting.getStr("plugin.id"));
            }
            FileUtil.copy(file.getAbsoluteFile(), pluginFile.getAbsoluteFile(),true);

            PluginInfo pluginInfo = pluginManager.install(pluginFile.toPath().toAbsolutePath());
            EnjoyConfig.jfr.getEngine().removeAllTemplateCache();
            // 存库
            saveOrUpdatePlugin(pluginInfo, pluginFile);
            PluginEvent pluginBean = pluginInfo.getPluginBean(PluginEvent.class);
            if (pluginBean == null) {
                return ResponseBean.success("插件安装成功",null);
            }
            // 如果是更新,则需要调用插件的更新方法,反之调用安装方法
            if (isUpdate) {
                pluginBean.onUpdate();
            } else {
                pluginBean.onInstall();
            }
            pluginBean.onStart();
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
     * @description 更新
     * @author Perfree
     */
    private void updatePlugin(PluginInfo pluginInfo, File file) {
        Plugin plugin = pluginsMapper.getByName(pluginInfo.getPluginWrapper().getDescriptor().getPluginId());
        plugin.setAuthor(pluginInfo.getPluginWrapper().getDescriptor().getProvider());
        plugin.setDesc(pluginInfo.getPluginWrapper().getDescriptor().getPluginDescription());
        plugin.setPath(file.getName());
        plugin.setName(pluginInfo.getPluginId());
        plugin.setVersion(pluginInfo.getPluginWrapper().getDescriptor().getVersion());
        plugin.setUpdateTime(new Date());
        pluginsMapper.update(plugin);
    }

    /** 
     * @description 保存插件信息
     * @author Perfree
     */ 
    private void saveOrUpdatePlugin(PluginInfo pluginInfo , File file) {
        Plugin byName = pluginsMapper.getByName(pluginInfo.getPluginId());
        if (byName != null) {
            updatePlugin(pluginInfo, file);
            return;
        }
        Plugin plugin = new Plugin();
        plugin.setAuthor(pluginInfo.getPluginWrapper().getDescriptor().getProvider());
        plugin.setDesc(pluginInfo.getPluginWrapper().getDescriptor().getPluginDescription());
        plugin.setPath(file.getName());
        plugin.setName(pluginInfo.getPluginId());
        plugin.setVersion(pluginInfo.getPluginWrapper().getDescriptor().getVersion());
        plugin.setCreateTime(new Date());
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
            File file = new File(Constants.PLUGIN_PATH + Constants.SEPARATOR + plugin.getPath());
            if (!file.exists()) {
                pluginsMapper.delById(plugin.getId());
                return true;
            }

            PluginInfo pluginInfo = pluginManager.getPluginInfoById(plugin.getName());
            PluginEvent pluginBean = pluginInfo.getPluginBean(PluginEvent.class);
            if (pluginBean != null) {
                pluginBean.onUnInstall();
            }

            pluginManager.unInstall(plugin.getName());
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
}
