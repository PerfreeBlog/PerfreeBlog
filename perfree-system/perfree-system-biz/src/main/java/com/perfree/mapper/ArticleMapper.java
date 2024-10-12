package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.constant.ArticleConstant;
import com.perfree.controller.auth.article.vo.ArticleCategoryRespVO;
import com.perfree.controller.auth.article.vo.ArticlePageReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.controller.auth.article.vo.ArticleTagRespVO;
import com.perfree.controller.auth.journal.vo.JournalPageReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.controller.common.article.vo.ArchivePageReqVO;
import com.perfree.controller.common.article.vo.ArchiveRespVO;
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
    IPage<ArticleRespVO> articlePage(IPage<ArticleRespVO> page,  @Param("pageVO") ArticlePageReqVO pageVO, @Param("loginUserId") Integer loginUserId);

    /**
     * 根据slug查询
     * @param slug slug
     * @return Article
     */
    default Article getBySlugAndType(String slug, String type){
        return selectOne(new LambdaQueryWrapper<Article>()
                .eq(Article::getSlug, slug)
                .eq(Article::getType, type)
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

    /**
     * 动态分页列表
     * @param page page
     * @param pageVO pageVO
     * @return IPage<JournalRespVO>
     */
    IPage<JournalRespVO> journalPage(IPage<JournalRespVO> page, @Param("pageVO") JournalPageReqVO pageVO, @Param("loginUserId") Integer loginUserId);

    /**
     * 根据id获取动态
     * @param id id
     * @return JournalRespVO
     */
    JournalRespVO getJournalById(@Param("id") Integer id);

    default List<Article> getAllPage(){
        return selectList(new LambdaQueryWrapper<Article>()
                .eq(Article::getType, ArticleConstant.ARTICLE_TYPE_PAGE)
                .orderByDesc(Article::getCreateTime)
        );
    }

    /**
     * 归档分页
     * @param page page
     * @param pageVO pageVO
     * @return IPage<ArchiveRespVO>
     */
    IPage<ArchiveRespVO> archivePage(IPage<ArchiveRespVO> page, @Param("pageVO") ArchivePageReqVO pageVO);

    /**
     * 获取最近发布的文章
     * @param num num
     * @return List<ArticleRespVO>
     */
    List<ArticleRespVO> getLatestArticle(@Param("num") Integer num);

    List<ArticleRespVO> getHotArticleByCommentCount(@Param("num") Integer num);

    List<ArticleRespVO> getHotArticleByViewCount(@Param("num") Integer num);

    void updateViewCount(@Param("id") Integer id);

    ArticleRespVO getBySlug(@Param("slug") String slug);

    List<ArticleRespVO> getHotArticleByGreatCount(@Param("num") Integer num);

}
