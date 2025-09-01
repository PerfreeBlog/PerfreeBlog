package com.perfree.service.article;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.article.vo.*;
import com.perfree.controller.auth.journal.vo.JournalAddReqVO;
import com.perfree.controller.auth.journal.vo.JournalPageReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.controller.auth.journal.vo.JournalUpdateReqVO;
import com.perfree.controller.common.article.vo.ArchivePageReqVO;
import com.perfree.controller.common.article.vo.ArchiveRespVO;
import com.perfree.model.Article;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

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
     * 根据slug/articleType/status获取文章
     * @param slug slug
     * @param articleType articleType
     * @param status status
     * @return ArticleRespVO
     */
    ArticleRespVO getBySlugAndTypeAndStatus(String slug, String articleType, Integer status);

    /**
     * 根据文章id获取上一篇文章
     * @param id id
     * @param articleType articleType
     * @param status status
     * @return ArticleRespVO ArticleRespVO
     */
    ArticleRespVO getPreArticle(Integer id, String articleType, Integer status);

    /**
     * 根据文章id获取下一篇文章
     * @param id id
     * @param articleType articleType
     * @param status status
     * @return ArticleRespVO ArticleRespVO
     */
    ArticleRespVO getNextArticle(Integer id, String articleType, Integer status);

    /**
     * 根据id获取文章
     * @param id id
     * @return Article
     */
    ArticleRespVO getArticleById(Integer id);

    /**
     * 修改文章
     * @param articleUpdateReqVO articleUpdateReqVO
     * @return Article
     */
    Article updateArticle(ArticleUpdateReqVO articleUpdateReqVO);

    /**
     * 文章点赞
     * @param id id
     * @return Boolean
     */
    Boolean updateGreatCount(Integer id);

    /**
     * 发表动态
     * @param journalAddReqVO journalAddReqVO
     * @return JournalRespVO
     */
    JournalRespVO createJournal(JournalAddReqVO journalAddReqVO);

    /**
     * 动态分页列表
     * @param pageVO pageVO
     * @return PageResult<JournalRespVO>
     */
    PageResult<JournalRespVO> journalPage(JournalPageReqVO pageVO);

    /**
     * 根据id获取动态
     * @param id id
     * @return JournalRespVO
     */
    JournalRespVO getJournalById(Integer id);

    /**
     * 修改动态
     * @param updateReqVO updateReqVO
     * @return JournalRespVO
     */
    JournalRespVO updateJournal(JournalUpdateReqVO updateReqVO);

    /**
     * 获取所有页面
     * @return List<Article>
     */
    List<Article> getAllPage();

    /**
     * 归档分页
     * @param pageVO pageVO
     * @return PageResult<ArchiveRespVO>
     */
    PageResult<ArchiveRespVO> archivePage(ArchivePageReqVO pageVO);

    /**
     * 获取最近发布的文章
     * @param num num
     * @return List<ArticleRespVO>
     */
    List<ArticleRespVO> getLatestArticle(Integer num);

    List<ArticleRespVO> getHotArticleByCommentCount(Integer num);

    List<ArticleRespVO> getHotArticleByViewCount(Integer num);

    void viewCountHandle(HttpServletRequest request, HttpServletResponse response, Integer id);

    ArticleRespVO getBySlug(String slug);

    List<ArticleRespVO> getHotArticleByGreatCount(Integer num);

    Boolean updateVisibility(ArticleUpdateVisibilityReqVO updateReqVO);

}
