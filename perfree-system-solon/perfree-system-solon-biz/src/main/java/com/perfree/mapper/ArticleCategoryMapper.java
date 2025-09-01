package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.ArticleCategory;
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
public interface ArticleCategoryMapper extends BaseMapperX<ArticleCategory> {
    default void delByCategoryId(Integer id){
        deleteByQuery(new QueryWrapper().eq(ArticleCategory::getCategoryId, id));
    }

    default void delByArticleId(Integer id){
        deleteByQuery(new QueryWrapper().eq(ArticleCategory::getArticleId, id));
    }

}
