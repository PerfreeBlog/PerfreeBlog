package com.perfree.service.site;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.site.vo.SiteAddReqVO;
import com.perfree.controller.site.vo.SitePageReqVO;
import com.perfree.controller.site.vo.SiteUpdateReqVO;
import com.perfree.model.Site;

public interface SiteService extends IService<Site> {

    /**
     * 站点分页
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
     * 删除站点
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

}
