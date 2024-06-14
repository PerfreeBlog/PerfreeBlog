package com.perfree.service.article;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.article.vo.ArticlePageReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.model.Article;
import com.baomidou.mybatisplus.extension.service.IService;

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

}
