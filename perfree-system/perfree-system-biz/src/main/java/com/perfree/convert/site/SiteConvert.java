package com.perfree.convert.site;


import com.perfree.commons.common.PageResult;
import com.perfree.controller.site.vo.SiteRespVO;
import com.perfree.model.Site;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SiteConvert {
    SiteConvert INSTANCE = Mappers.getMapper(SiteConvert.class);

    PageResult<SiteRespVO> convertPageResultVO(PageResult<Site> sitePageResult);

}
