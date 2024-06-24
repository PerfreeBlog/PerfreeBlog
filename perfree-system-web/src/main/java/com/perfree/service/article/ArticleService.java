package com.perfree.service.article;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.article.vo.*;
import com.perfree.model.Article;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface ArticleService extends IService<Article> {

    /**
     * 文章分页列表
     * @param pageVO pageVO
     * @return PageResult<ArticleRespVO>
     */
    PageResult<ArticleRespVO> articlePage(ArticlePageReqVO pageVO);

    /**
     * 发表文章
     * @param articleAddReqVO articleAddReqVO
     * @return Article
     */
    Article createArticle(ArticleAddReqVO articleAddReqVO);

    /**
     * 修改文章是否允许评论
     * @param articleUpdateIsCommentReqVO articleUpdateIsCommentReqVO
     * @return Boolean
     */
    Boolean updateIsComment(ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO);

    /**
     * 修改文章是否置顶
     * @param articleUpdateIsTopReqVO articleUpdateIsTopReqVO
     * @return Boolean
     */
    Boolean updateIsTop(ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO);

    /**
     * 修改文章状态
     * @param articleUpdateStatusReqVO articleUpdateStatusReqVO
     * @return Boolean
     */
    Boolean updateStatus(ArticleUpdateStatusReqVO articleUpdateStatusReqVO);

    /**
     * 根据id删除文章
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);


    /**
     * 获取文章数量
     * @return Long
     */
    Long getArticleCount();

    /**
     * 获取动态数量
     * @return Long
     */
    Long getJournalCount();
}
