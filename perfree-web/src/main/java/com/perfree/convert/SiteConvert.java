package com.perfree.convert;

import com.perfree.commons.PageResult;
import com.perfree.controller.api.site.vo.SiteAddReqVO;
import com.perfree.controller.api.site.vo.SiteRespVO;
import com.perfree.controller.api.site.vo.SiteUpdateReqVO;
import com.perfree.controller.api.site.vo.SiteUpdateStatusReqVO;
import com.perfree.model.Site;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SiteConvert {
    SiteConvert INSTANCE = Mappers.getMapper(SiteConvert.class);

    PageResult<SiteRespVO> convertPageResultVO(PageResult<Site> sitePageResult);

    SiteRespVO convertRespVO(Site byId);

    Site convertAddReqVO(SiteAddReqVO siteAddReqVO);

    Site convertUpdateReqVO(SiteUpdateReqVO siteUpdateReqVO);

    Site convertUpdateStatusReqVO(SiteUpdateStatusReqVO siteUpdateStatusReqVO);

    List<SiteRespVO> convertRespVOList(List<Site> list);

}
