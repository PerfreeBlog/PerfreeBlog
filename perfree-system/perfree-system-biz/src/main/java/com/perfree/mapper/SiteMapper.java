package com.perfree.mapper;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.site.vo.SitePageReqVO;
import com.perfree.model.Role;
import com.perfree.model.Site;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SiteMapper extends BaseMapperX<Site> {
   default PageResult<Site> sitePage(SitePageReqVO pageVO){
       return selectPage(pageVO, new LambdaQueryWrapper<Site>()
               .like(StringUtils.isNotBlank(pageVO.getSiteName()), Site::getSiteName, pageVO.getSiteName())
               .orderByDesc(Site::getCreateTime));
   }

}
