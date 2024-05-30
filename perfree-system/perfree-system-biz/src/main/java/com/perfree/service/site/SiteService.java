package com.perfree.service.site;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.site.vo.SitePageReqVO;
import com.perfree.model.Site;

public interface SiteService extends IService<Site> {

    /**
     * 站点分页
     * @param pageVO pageVO
     * @return PageResult<Site>
     */
    PageResult<Site> sitePage(SitePageReqVO pageVO);

}
