package com.perfree.service;

import com.perfree.commons.Update;

/**
 * @description UpdateService
 * @author Perfree
 * @date 2021/11/15 10:30
 */
public interface UpdateService {

    void asyncUpdate();

    void backup();

    /**
     * @description 更新操作
     * @author Perfree
     * @date 2021/10/30 10:32
     */
    boolean update(String updateFilePath);

    /**
     * @description 检测是否有更新
     * @author Perfree
     * @date 2021/10/29 15:01
     */
    Update checkUpdate();

    /**
     * @description 下载更新文件
     * @author Perfree
     * @date 2021/10/29 16:08
     */
    String downloadUpdate(Update update);
}
