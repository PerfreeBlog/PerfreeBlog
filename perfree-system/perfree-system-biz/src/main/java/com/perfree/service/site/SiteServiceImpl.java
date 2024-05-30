package com.perfree.service.site;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.site.vo.SitePageReqVO;
import com.perfree.mapper.SiteMapper;
import com.perfree.model.Site;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;


@Service
public class SiteServiceImpl extends ServiceImpl<SiteMapper, Site> implements SiteService {

    @Resource
    private SiteMapper siteMapper;


    @Override
    public PageResult<Site> sitePage(SitePageReqVO pageVO) {
        return siteMapper.sitePage(pageVO);
    }
}
