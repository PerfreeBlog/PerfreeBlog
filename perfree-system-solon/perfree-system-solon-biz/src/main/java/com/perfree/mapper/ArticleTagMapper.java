package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.ArticleTag;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.solon.annotation.Db;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface ArticleTagMapper extends BaseMapperX<ArticleTag> {

    default void delByTagId(Integer id){
        deleteByQuery(new QueryWrapper().eq(ArticleTag::getTagId, id));
    }

    default void delByArticleId(Integer id){
        deleteByQuery(new QueryWrapper().eq(ArticleTag::getArticleId, id));
    }

}
