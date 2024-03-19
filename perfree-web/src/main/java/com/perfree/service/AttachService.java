package com.perfree.service;

import com.perfree.commons.Pager;
import com.perfree.model.Attach;

/**
 * @description AttachService
 * @author Perfree
 * @date 2021/11/15 9:58
 */
public interface AttachService {
    /**
     * 新增附件
     * @param attach attach
     * @return int
     */
    int add(Attach attach);

    /**
     * 附件管理列表页
     * @param pager pager
     * @return Pager<Attach>
     */
    Pager<Attach> list(Pager<Attach> pager);

    /**
     * 根据id获取附件信息
     * @param id id
     * @return Attach
     */
    Attach getById(String id);

    /**
     * 删除附件
     * @param idArr idArr
     * @return int
     */
    int del(String[] idArr);

    /**
     * 更新附件信息
     * @param attach attach
     * @return int
     */
    int update(Attach attach);
}
