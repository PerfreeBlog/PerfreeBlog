package com.perfree.service;

import cn.hutool.core.io.FileUtil;
import cn.hutool.setting.Setting;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Constants;
import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.mapper.PluginsMapper;
import com.perfree.model.Plugin;
import com.perfree.plugins.PluginsUtils;
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
            multiFile.transferTo(file.getAbsoluteFile());
            Setting setting = PluginsUtils.getSetting(file);
            if (setting.isEmpty()) {
                return ResponseBean.fail("插件安装失败:插件内无配置文件", null);
            }
            File pluginFile = new File(Constants.PLUGIN_PATH + Constants.SEPARATOR + multiFileName);
            if (pluginFile.exists()) {
                Setting pluginSetting = PluginsUtils.getSetting(pluginFile);
                if (pluginSetting.getStr("plugin.version").equals(setting.getStr("plugin.version"))){
                    Plugin plugin = pluginsMapper.getByPath(multiFileName);
                    // 如果数据库不存在该插件,但插件目录有,则先卸载再安装
                    if (plugin == null) {
                        PluginsUtils.unloadJarFiles(pluginFile, Constants.PLUGIN_TYPE_UPDATE);
                        return installJar(file, pluginFile, setting);
                    }
                    return ResponseBean.fail("插件安装失败:当前版本的插件已存在", null);
                }
                return updateJar(file, pluginFile, setting);
            }
            return installJar(file, pluginFile, setting);
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
     * @description 插件安装
     * @return com.perfree.common.ResponseBean
     * @author Perfree
     */
    public ResponseBean installJar(File file, File pluginFile, Setting setting) throws Exception {
        Plugin plugin = pluginsMapper.getByPath(file.getName());
        if (plugin != null) {
            return ResponseBean.success("相同插件名或插件路径已经存在,请勿重复安装", null);
        }
        File copyPlugin = FileUtil.copy(file, pluginFile, false);
        FileUtil.del(file);
        PluginsUtils.installJar(copyPlugin, Constants.PLUGIN_TYPE_INSTALL);
        savePlugin(setting, file);
        return ResponseBean.success("插件安装成功", null);
    }

    /**
     * @description 插件更新
     * @author Perfree
     */
    public ResponseBean updateJar(File file, File pluginFile, Setting setting) throws Exception {
        PluginsUtils.unloadJarFiles(pluginFile, Constants.PLUGIN_TYPE_UPDATE);
        File copyPlugin = FileUtil.copy(file, pluginFile, false);
        FileUtil.del(file);
        PluginsUtils.installJar(copyPlugin, Constants.PLUGIN_TYPE_UPDATE);
        updatePlugin(file, setting);
        return ResponseBean.success("插件更新成功", null);
    }

    /**
     * @description 更新
     * @author Perfree
     */
    private void updatePlugin(File file, Setting setting) {
        Plugin plugin = pluginsMapper.getByPath(file.getName());
        plugin.setAuthor(setting.getStr("plugin.author"));
        plugin.setDesc(setting.getStr("plugin.desc"));
        plugin.setPath(file.getName());
        plugin.setName(setting.getStr("plugin.name"));
        plugin.setVersion(setting.getStr("plugin.version"));
        plugin.setUpdateTime(new Date());
        pluginsMapper.update(plugin);
    }

    /** 
     * @description 保存插件信息
     * @author Perfree
     */ 
    private void savePlugin(Setting setting , File file) {
        Plugin plugin = new Plugin();
        plugin.setAuthor(setting.getStr("plugin.author"));
        plugin.setDesc(setting.getStr("plugin.desc"));
        plugin.setPath(file.getName());
        plugin.setName(setting.getStr("plugin.name"));
        plugin.setVersion(setting.getStr("plugin.version"));
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
            File pluginFile = new File(Constants.PLUGIN_PATH + Constants.SEPARATOR + plugin.getPath());
            PluginsUtils.unloadJarFiles(pluginFile, Constants.PLUGIN_TYPE_UNINSTALL);
            pluginsMapper.delById(plugin.getId());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("插件卸载失败:{}", e.getMessage());
            return false;
        }
    }
}
