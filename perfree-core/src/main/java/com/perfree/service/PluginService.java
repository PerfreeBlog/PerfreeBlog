package com.perfree.service;

import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Plugin;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @description PluginService
 * @author Perfree
 * @date 2021/11/15 10:23
 */
public interface PluginService {
    /**
     * @description  添加插件
     * @param multiFile  multiFile
     * @return boolean
     * @author Perfree
     */
    ResponseBean addPlugin(MultipartFile multiFile);

    /**
     * @description 插件列表
     * @author Perfree
     */
    Pager<Plugin> list(Pager<Plugin> pager);

    /**
     * @description 卸载插件
     * @return boolean
     * @author Perfree
     */
    boolean del(String id);

    /**
     * @description 获取所有插件
     * @author Perfree
     */
    List<Plugin> getAll();

    boolean startPlugin(String id);

    boolean stopPlugin(String id);

    Plugin getById(String id);
}
