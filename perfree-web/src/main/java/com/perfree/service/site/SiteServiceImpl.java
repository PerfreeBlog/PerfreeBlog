package com.perfree.service.site;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.SiteCacheService;
import com.perfree.commons.PageResult;
import com.perfree.constants.SiteConstant;
import com.perfree.controller.api.site.vo.*;
import com.perfree.convert.SiteConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.exception.ServiceException;
import com.perfree.mapper.SiteMapper;
import com.perfree.model.Site;
import com.perfree.shared.api.site.dto.SiteDTO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class SiteServiceImpl extends ServiceImpl<SiteMapper, Site> implements SiteService {

    @Resource
    private SiteMapper siteMapper;

    @Resource
    private SiteCacheService siteCacheService;

    @Override
    public PageResult<Site> sitePage(SitePageReqVO pageVO) {
        return siteMapper.sitePage(pageVO);
    }

    @Override
    @Transactional
    public Site addSite(SiteAddReqVO siteAddReqVO) {
        Site site = SiteConvert.INSTANCE.convertAddReqVO(siteAddReqVO);
        Site querySite = siteMapper.findByFlag(site.getFlag());
        if (null != querySite) {
            throw new ServiceException(ErrorCode.SITE_FLAG_EXIST);
        }
        siteMapper.insert(site);
        siteCacheService.putSite(site.getFlag(), SiteConvert.INSTANCE.convertDTO(site));
        return site;
    }

    @Override
    @Transactional
    public Site updateSite(SiteUpdateReqVO siteUpdateReqVO) {
        Site site = SiteConvert.INSTANCE.convertUpdateReqVO(siteUpdateReqVO);
        Site querySite = siteMapper.findByFlag(site.getFlag());
        if (null != querySite && !querySite.getId().equals(site.getId())) {
            throw new ServiceException(ErrorCode.SITE_FLAG_EXIST);
        }
        siteMapper.updateById(site);
        siteCacheService.putSite(site.getFlag(), SiteConvert.INSTANCE.convertDTO(site));
        return site;
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        Site site = siteMapper.selectById(id);
        siteMapper.deleteById(id);
        siteCacheService.removeSite(site.getFlag());
        return true;
    }

    @Override
    @Transactional
    public Boolean updateStatus(SiteUpdateStatusReqVO siteUpdateStatusReqVO) {
        Site site = siteMapper.selectById(siteUpdateStatusReqVO.getId());
        site.setStatus(siteUpdateStatusReqVO.getStatus());
        siteMapper.updateById(site);
        if (Objects.equals(site.getStatus(), SiteConstant.SITE_STATUS_OPEN)) {
            siteCacheService.putSite(site.getFlag(), SiteConvert.INSTANCE.convertDTO(site));
        } else {
            siteCacheService.removeSite(site.getFlag());
        }
        return true;
    }

    @Override
    @Transactional
    public Boolean batchDel(String ids) {
        String[] idArr = ids.split(",");
        for (String id : idArr) {
            Site site = siteMapper.selectById(id);
            siteMapper.deleteById(id);
            siteCacheService.removeSite(site.getFlag());
        }
        return true;
    }

    @Override
    public void initSiteCache() {
        List<Site> sites = siteMapper.getList();
        for (Site site : sites) {
            siteCacheService.putSite(site.getFlag(), SiteConvert.INSTANCE.convertDTO(site));
        }
    }

    @Override
    public List<SiteRespVO> getList() {
        List<SiteDTO> allSite = siteCacheService.getAllSite();
        return SiteConvert.INSTANCE.convertRespVOListByDTO(allSite);
    }
}
