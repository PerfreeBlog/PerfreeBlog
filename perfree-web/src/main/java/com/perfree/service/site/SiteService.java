package com.perfree.service.site;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.PageResult;
import com.perfree.controller.api.site.vo.*;
import com.perfree.model.Site;

import java.util.List;

public interface SiteService extends IService<Site> {

    /**
     * 多站点分页
     * @param pageVO pageVO
     * @return PageResult<Site>
     */
    PageResult<Site> sitePage(SitePageReqVO pageVO);

    /**
     * 添加站点
     * @param siteAddReqVO siteAddReqVO
     * @return Site
     */
    Site addSite(SiteAddReqVO siteAddReqVO);

    /**
     * 更新站点
     * @param siteUpdateReqVO siteUpdateReqVO
     * @return Site
     */
    Site updateSite(SiteUpdateReqVO siteUpdateReqVO);

    /**
     * 删除
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 更新状态
     * @param siteUpdateStatusReqVO siteUpdateStatusReqVO
     * @return Boolean
     */
    Boolean updateStatus(SiteUpdateStatusReqVO siteUpdateStatusReqVO);

    /**
     * 批量删除
     * @param ids ids
     * @return Boolean
     */
    Boolean batchDel(String ids);

    /**
     * 初始化站点缓存
     */
    void initSiteCache();

    /**
     * 获取所有站点
     * @return List<Site>
     */
    List<SiteRespVO> getList();

}
