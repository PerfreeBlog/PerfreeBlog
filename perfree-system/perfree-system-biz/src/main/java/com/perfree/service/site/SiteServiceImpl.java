package com.perfree.service.site;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.exception.ServiceException;
import com.perfree.constant.SiteConstant;
import com.perfree.controller.site.vo.SiteAddReqVO;
import com.perfree.controller.site.vo.SitePageReqVO;
import com.perfree.controller.site.vo.SiteUpdateReqVO;
import com.perfree.convert.site.SiteConvert;
import com.perfree.mapper.SiteMapper;
import com.perfree.model.Site;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.perfree.enums.ErrorCode.SITE_SLUG_EXIST;


@Service
public class SiteServiceImpl extends ServiceImpl<SiteMapper, Site> implements SiteService {

    @Resource
    private SiteMapper siteMapper;


    @Override
    public PageResult<Site> sitePage(SitePageReqVO pageVO) {
        return siteMapper.sitePage(pageVO);
    }

    @Override
    @Transactional
    public Site addSite(SiteAddReqVO siteAddReqVO) {
        Site querySite = siteMapper.selectBySlug(siteAddReqVO.getSiteSlug());
        if (null != querySite) {
            throw new ServiceException(SITE_SLUG_EXIST);
        }
        Site site = SiteConvert.INSTANCE.convertAddVoToModel(siteAddReqVO);
        site.setStatus(SiteConstant.SITE_STATUS_OPEN);
        siteMapper.insert(site);
        return site;
    }

    @Override
    @Transactional
    public Site updateSite(SiteUpdateReqVO siteUpdateReqVO) {
        Site querySite = siteMapper.selectBySlug(siteUpdateReqVO.getSiteSlug());
        if (null != querySite && !siteUpdateReqVO.getId().equals(querySite.getId())) {
            throw new ServiceException(SITE_SLUG_EXIST);
        }
        Site site = SiteConvert.INSTANCE.convertUpdateVoToModel(siteUpdateReqVO);
        siteMapper.updateById(site);
        return site;
    }

    @Override
    public Boolean del(Integer id) {
        siteMapper.deleteById(id);
        return true;
    }
}
