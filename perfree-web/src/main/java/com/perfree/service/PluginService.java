package com.perfree.service;

import cn.hutool.core.io.FileUtil;
import cn.hutool.setting.dialect.Props;
import com.gitee.starblues.integration.application.PluginApplication;
import com.gitee.starblues.integration.operator.PluginOperator;
import com.gitee.starblues.integration.operator.module.PluginInfo;
import com.gitee.starblues.integration.user.PluginUser;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Constants;
import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.config.EnjoyConfig;
import com.perfree.mapper.PluginsMapper;
import com.perfree.model.Plugin;
import com.perfree.plugins.PluginsUtils;
import org.pf4j.PluginDescriptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.List;

@Service
public class PluginService {
    private final Logger logger = LoggerFactory.getLogger(PluginService.class);
    @Autowired
    private PluginsMapper pluginsMapper;


    @Autowired
    private PluginApplication pluginApplication;

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
                FileUtil.del(file);
            }
            // 将插件存储至临时目录
            multiFile.transferTo(file.getAbsoluteFile());

            // 读取插件配置文件
            Props setting = PluginsUtils.getSetting(file);
            if (setting.isEmpty()) {
                return ResponseBean.fail("插件安装失败:插件内无配置文件", null);
            }
            // 遍历当前已安装的插件,如果插件id已存在,则先卸载再安装并判定为更新操作
            PluginOperator pluginOperator = pluginApplication.getPluginOperator();
            PluginUser pluginUser = pluginApplication.getPluginUser();
            List<Plugin> pluginList = pluginsMapper.getAll();
            boolean isUpdate = false;
            for (Plugin plugin : pluginList) {
               if (plugin.getName().equals(setting.getStr("plugin.id"))) {
                   isUpdate = true;
               }
            }

            File pluginFile = new File(Constants.PLUGIN_PATH + Constants.SEPARATOR + file.getName());
            if (pluginFile.exists()) {
                pluginOperator.uninstall(setting.getStr("plugin.id"), false);
            }

            PluginInfo install = pluginOperator.install(file.toPath().toAbsolutePath());
            EnjoyConfig.jfr.getEngine().removeAllTemplateCache();
            // 存库
            saveOrUpdatePlugin(install.getPluginDescriptor(), file, isUpdate);
            List<com.perfree.plugins.Plugin> pluginBeans = pluginUser.getPluginBeans(install.getPluginDescriptor().getPluginId(), com.perfree.plugins.Plugin.class);
            if (pluginBeans == null || pluginBeans.isEmpty()) {
                return ResponseBean.success("插件安装成功",null);
            }
            // 如果是更新,则需要调用插件的更新方法,反之调用安装方法
            if (isUpdate) {
                pluginBeans.get(0).onUpdate();
            } else {
                pluginBeans.get(0).onInstall();
            }
            pluginBeans.get(0).onStart();
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
    private void updatePlugin(PluginDescriptor setting, File file) {
        Plugin plugin = pluginsMapper.getByName(setting.getPluginId());
        plugin.setAuthor(setting.getProvider());
        plugin.setDesc(setting.getPluginDescription());
        plugin.setPath(file.getName());
        plugin.setName(setting.getPluginId());
        plugin.setVersion(setting.getVersion());
        plugin.setUpdateTime(new Date());
        pluginsMapper.update(plugin);
    }

    /** 
     * @description 保存插件信息
     * @author Perfree
     */ 
    private void saveOrUpdatePlugin(PluginDescriptor setting , File file, boolean isUpdate) {
        if (isUpdate) {
            updatePlugin(setting, file);
            return;
        }
        Plugin plugin = new Plugin();
        plugin.setAuthor(setting.getProvider());
        plugin.setDesc(setting.getPluginDescription());
        plugin.setPath(file.getName());
        plugin.setName(setting.getPluginId());
        plugin.setVersion(setting.getVersion());
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
            PluginOperator pluginOperator = pluginApplication.getPluginOperator();
            PluginUser pluginUser = pluginApplication.getPluginUser();
            List<com.perfree.plugins.Plugin> pluginBeans = pluginUser.getPluginBeans(plugin.getName(), com.perfree.plugins.Plugin.class);
            if (pluginBeans != null && pluginBeans.size() > 0) {
                pluginBeans.get(0).onUnInstall();
            }
            File file = new File(Constants.PLUGIN_PATH + Constants.SEPARATOR + plugin.getPath());
            if (!file.exists()) {
                pluginsMapper.delById(plugin.getId());
                return true;
            }
            boolean uninstall = pluginOperator.uninstall(plugin.getName(), false);
            if (uninstall) {
                pluginsMapper.delById(plugin.getId());
            }
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
