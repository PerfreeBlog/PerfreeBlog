package com.perfree.service.article;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.utils.MyBatisUtils;
import com.perfree.controller.auth.article.vo.ArticleAddReqVO;
import com.perfree.controller.auth.article.vo.ArticlePageReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.mapper.ArticleMapper;
import com.perfree.model.Article;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    @Resource
    private ArticleMapper articleMapper;

    @Override
    public PageResult<ArticleRespVO> articlePage(ArticlePageReqVO pageVO) {
        IPage<ArticleRespVO> page = MyBatisUtils.buildPage(pageVO);
        IPage<ArticleRespVO> articlePage = articleMapper.articlePage(page, pageVO);
        return new PageResult<>(articlePage.getRecords(), articlePage.getTotal());
    }

    @Override
    public Article createArticle(ArticleAddReqVO articleAddReqVO) {
        return null;
    }
}
