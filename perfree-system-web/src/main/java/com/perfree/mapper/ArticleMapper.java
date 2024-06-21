package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.article.vo.ArticlePageReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.model.Article;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface ArticleMapper extends BaseMapperX<Article> {

    /**
     * 文章分页查询
     * @param page page
     * @param pageVO pageVO
     * @return IPage<ArticleRespVO>
     */
    IPage<ArticleRespVO> articlePage(IPage<ArticleRespVO> page,  @Param("pageVO") ArticlePageReqVO pageVO);

    /**
     * 根据slug查询
     * @param slug slug
     * @return Article
     */
    default Article getBySlug(String slug){
        return selectOne(new LambdaQueryWrapper<Article>()
                .eq(Article::getSlug, slug)
        );
    }

}
