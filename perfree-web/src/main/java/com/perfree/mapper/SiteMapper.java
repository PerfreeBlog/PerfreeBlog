package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.PageResult;
import com.perfree.controller.api.site.vo.SitePageReqVO;
import com.perfree.model.Site;
import com.perfree.model.User;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SiteMapper extends BaseMapperX<Site> {
    default PageResult<Site> sitePage(SitePageReqVO pageVO) {
        return selectPage(pageVO, new LambdaQueryWrapper<Site>()
                .like(StringUtils.isNotBlank(pageVO.getName()), Site::getName, pageVO.getName())
                .like(StringUtils.isNotBlank(pageVO.getFlag()), Site::getFlag, pageVO.getFlag())
                .orderByDesc(Site::getCreateTime));
    }

    default Site findByFlag(String flag){
        return selectOne(new LambdaQueryWrapper<Site>().eq(Site::getFlag, flag));
    }

}
