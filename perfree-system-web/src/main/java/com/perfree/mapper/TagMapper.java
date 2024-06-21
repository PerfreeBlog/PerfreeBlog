package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.tag.vo.TagPageReqVO;
import com.perfree.model.Tag;
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
public interface TagMapper extends BaseMapperX<Tag> {

    default PageResult<Tag> tagPage(TagPageReqVO pageVO){
        return selectPage(pageVO, new LambdaQueryWrapper<Tag>()
                .like(StringUtils.isNotBlank(pageVO.getName()), Tag::getName, pageVO.getName())
        );
    }

    default Tag selectBySlug(String slug){
        return selectOne(new LambdaQueryWrapper<Tag>()
                .eq(Tag::getSlug, slug));
    }

}
