package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.link.vo.LinkPageReqVO;
import com.perfree.model.Link;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface LinkMapper extends BaseMapperX<Link> {

    default PageResult<Link> linkPage(LinkPageReqVO pageVO){
        return selectPage(pageVO, new LambdaUpdateWrapper<Link>()
                .eq(StringUtils.isNotBlank(pageVO.getName()), Link::getName, pageVO.getName())
        );
    }

}
