package com.perfree.convert.site;


import com.perfree.commons.common.PageResult;
import com.perfree.controller.site.vo.SiteAddReqVO;
import com.perfree.controller.site.vo.SiteRespVO;
import com.perfree.controller.site.vo.SiteUpdateReqVO;
import com.perfree.model.Site;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SiteConvert {
    SiteConvert INSTANCE = Mappers.getMapper(SiteConvert.class);

    PageResult<SiteRespVO> convertPageResultVO(PageResult<Site> sitePageResult);

    SiteRespVO convertRespVO(Site site);

    Site convertAddVoToModel(SiteAddReqVO siteAddReqVO);

    Site convertUpdateVoToModel(SiteUpdateReqVO siteUpdateReqVO);

}
