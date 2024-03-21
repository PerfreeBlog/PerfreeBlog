package com.perfree.service.site;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.PageResult;
import com.perfree.controller.api.site.vo.SiteAddReqVO;
import com.perfree.controller.api.site.vo.SitePageReqVO;
import com.perfree.controller.api.site.vo.SiteUpdateReqVO;
import com.perfree.controller.api.site.vo.SiteUpdateStatusReqVO;
import com.perfree.convert.SiteConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.exception.ServiceException;
import com.perfree.mapper.SiteMapper;
import com.perfree.model.Site;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

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
        Site site = SiteConvert.INSTANCE.convertAddReqVO(siteAddReqVO);
        Site querySite = siteMapper.findByFlag(site.getFlag());
        if (null != querySite) {
            throw new ServiceException(ErrorCode.SITE_FLAG_EXIST);
        }
        siteMapper.insert(site);
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
        return site;
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        siteMapper.deleteById(id);
        return true;
    }

    @Override
    @Transactional
    public Boolean updateStatus(SiteUpdateStatusReqVO siteUpdateStatusReqVO) {
        Site site = SiteConvert.INSTANCE.convertUpdateStatusReqVO(siteUpdateStatusReqVO);
        siteMapper.updateById(site);
        return true;
    }

    @Override
    @Transactional
    public Boolean batchDel(String ids) {
        String[] idArr = ids.split(",");
        siteMapper.deleteBatchIds(Arrays.stream(idArr).toList());
        return true;
    }
}
