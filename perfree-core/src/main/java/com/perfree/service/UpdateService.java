package com.perfree.service;

import com.perfree.commons.Update;

/**
 * @description UpdateService
 * @author Perfree
 * @date 2021/11/15 10:30
 */
public interface UpdateService {

    /**
     * @description 检测是否有更新
     * @author Perfree
     * @date 2021/10/29 15:01
     */
    Update checkUpdate();
}
