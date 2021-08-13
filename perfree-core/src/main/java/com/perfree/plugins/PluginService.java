package com.perfree.plugins;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.ZipUtil;
import cn.hutool.setting.Setting;
import com.perfree.common.Constants;
import com.perfree.common.ResponseBean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class PluginService {

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
            Setting setting = PluginsUtil.getSetting(file);
            if (setting.isEmpty()) {
                return ResponseBean.fail("插件安装失败:插件内无配置文件", null);
            }
            File pluginFile = new File(Constants.PLUGIN_PATH + Constants.SEPARATOR + multiFileName);
            if (pluginFile.exists()) {
                Setting pluginSetting = PluginsUtil.getSetting(pluginFile);
                /*if (pluginSetting.getStr("plugin.version").equals(setting.getStr("plugin.version"))){
                    return ResponseBean.fail("插件安装失败:当前版本的插件已存在", null);
                }*/
                // TODO update
                new PluginsUtil().unloadJarFiles(pluginFile);
                return ResponseBean.success("插件更新成功", null);
            }
            File copyPlugin = FileUtil.copy(file, pluginFile, false);
            FileUtil.del(file);
            new PluginsUtil().installJar(copyPlugin);
            return ResponseBean.success("插件安装成功", null);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseBean.fail("插件安装失败:" + e.getMessage(), e.getMessage());
        } finally {
            if (file != null && file.exists()) {
                FileUtil.del(file);
            }
        }

    }
}
