package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.constant.ArticleConstant;
import com.perfree.controller.auth.article.vo.ArticleCategoryRespVO;
import com.perfree.controller.auth.article.vo.ArticlePageReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.controller.auth.article.vo.ArticleTagRespVO;
import com.perfree.model.Article;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

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

    /**
     * 根据文章id获取标签
     * @param id id
     * @return List<ArticleTagRespVO>
     */
    List<ArticleTagRespVO> getArticleTagById(Integer id);


    /**
     * 根据文章id获取分类
     * @param id id
     * @return List<ArticleCategoryRespVO>
     */
    List<ArticleCategoryRespVO> getArticleCategoryById(Integer id);

    /**
     * 根据slug/articleType/status获取文章信息
     * @param slug slug
     * @param articleType articleType
     * @param status status
     * @return ArticleRespVO
     */
    ArticleRespVO getBySlugAndTypeAndStatus(@Param("slug") String slug, @Param("articleType") String articleType, @Param("status") Integer status);

    /**
     * 根据当前文章id获取上一篇文章
     * @param id id
     * @return ArticleRespVO
     */
    ArticleRespVO getPreArticle(@Param("id") Integer id,@Param("articleType")  String articleType,@Param("status")  Integer status);

    /**
     * 根据当前文章id获取下一篇文章
     * @param id id
     * @return ArticleRespVO
     */
    ArticleRespVO getNextArticle(@Param("id") Integer id,@Param("articleType")  String articleType,@Param("status")  Integer status);

    /**
     * 根据文章id获取文章
     * @param id id
     * @return ArticleRespVO ArticleRespVO
     */
    ArticleRespVO getArticleById(@Param("id") Integer id);

    /**
     * 更新文章点赞数
     * @param id id
     * @return Boolean
     */
    Boolean updateGreatCount(@Param("id") Integer id);

}
