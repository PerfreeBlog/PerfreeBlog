package com.perfree.service.article;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.MyBatisUtils;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.constant.OptionConstant;
import com.perfree.controller.auth.article.vo.*;
import com.perfree.convert.article.ArticleConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.mapper.ArticleCategoryMapper;
import com.perfree.mapper.ArticleMapper;
import com.perfree.mapper.ArticleTagMapper;
import com.perfree.model.Article;
import com.perfree.model.ArticleCategory;
import com.perfree.model.ArticleTag;
import com.perfree.model.Tag;
import com.perfree.service.tag.TagService;
import com.perfree.system.api.option.dto.OptionDTO;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.dromara.hutool.core.collection.ListUtil;
import org.dromara.hutool.http.html.HtmlUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.enums.ErrorCode.ARTICLE_SLUG_EXIST;

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

    @Resource
    private ArticleTagMapper articleTagMapper;

    @Resource
    private ArticleCategoryMapper articleCategoryMapper;

    @Resource
    private TagService tagService;

    @Resource
    private OptionCacheService optionCacheService;

    @Override
    public PageResult<ArticleRespVO> articlePage(ArticlePageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("isTop", SortingField.ORDER_DESC),
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        IPage<ArticleRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<ArticleRespVO> articlePage = articleMapper.articlePage(page, pageVO);
        return new PageResult<>(articlePage.getRecords(), articlePage.getTotal());
    }

    @Override
    @Transactional
    public Article createArticle(ArticleAddReqVO articleAddReqVO) {
        // 验证slug是否重复
        Article queryBySlug = articleMapper.getBySlug(articleAddReqVO.getSlug());
        if (null != queryBySlug) {
            throw new ServiceException(ARTICLE_SLUG_EXIST);
        }
        // 获取新增的标签,将新增的标签入库
        List<Tag> tagList = tagService.batchAddTagByName(articleAddReqVO.getAddTags());
        for (Tag tag : tagList) {
            articleAddReqVO.getTagIds().add(tag.getId());
        }

        Article article = ArticleConvert.INSTANCE.convertModelByCreateArticleVO(articleAddReqVO);
        article.setViewCount(SystemConstants.DEFAULT_COUNT);
        article.setCommentCount(SystemConstants.DEFAULT_COUNT);
        article.setGreatCount(SystemConstants.DEFAULT_COUNT);
        article.setSummary(genSummary(article.getSummary(), article.getParseContent()));
        articleMapper.insert(article);

        // 处理标签关联关系
        List<ArticleTag> articleTagList = new ArrayList<>();
        for (Integer tagId : articleAddReqVO.getTagIds()) {
            ArticleTag articleTag = new ArticleTag();
            articleTag.setArticleId(article.getId());
            articleTag.setTagId(tagId);
            articleTagList.add(articleTag);
        }
        articleTagMapper.insertBatch(articleTagList);

        // 处理分类关联关系
        List<ArticleCategory> articleCategoryList = new ArrayList<>();
        for (Integer categoryId : articleAddReqVO.getCategoryIds()) {
            ArticleCategory articleCategory = new ArticleCategory();
            articleCategory.setArticleId(article.getId());
            articleCategory.setCategoryId(categoryId);
            articleCategoryList.add(articleCategory);
        }
        articleCategoryMapper.insertBatch(articleCategoryList);

        return article;
    }

    @Override
    @Transactional
    public Boolean updateIsComment(ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO) {
        Article article = ArticleConvert.INSTANCE.convertModelByIsCommentVO(articleUpdateIsCommentReqVO);
        articleMapper.updateById(article);
        return true;
    }

    @Override
    @Transactional
    public Boolean updateIsTop(ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO) {
        Article article = ArticleConvert.INSTANCE.convertModelByIsTopVO(articleUpdateIsTopReqVO);
        articleMapper.updateById(article);
        return true;
    }

    @Override
    @Transactional
    public Boolean updateStatus(ArticleUpdateStatusReqVO articleUpdateStatusReqVO) {
        Article article = ArticleConvert.INSTANCE.convertModelByStatusVO(articleUpdateStatusReqVO);
        articleMapper.updateById(article);
        return true;
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        articleCategoryMapper.delByArticleId(id);
        articleTagMapper.delByArticleId(id);
        articleMapper.deleteById(id);
        return true;
    }

    @Override
    public Long getArticleCount() {
        return articleMapper.getArticleCount();
    }

    @Override
    public Long getJournalCount() {
        return articleMapper.getJournalCount();
    }

    @Override
    public ArticleRespVO getBySlugAndTypeAndStatus(String slug, String articleType, Integer status) {
        return articleMapper.getBySlugAndTypeAndStatus(slug, articleType, status);
    }

    @Override
    public ArticleRespVO getPreArticle(Integer id, String articleType, Integer status) {
        return articleMapper.getPreArticle(id, articleType, status);
    }

    @Override
    public ArticleRespVO getNextArticle(Integer id, String articleType, Integer status) {
        return articleMapper.getNextArticle(id, articleType, status);
    }

    @Override
    public ArticleRespVO getArticleById(Integer id) {
        return articleMapper.getArticleById(id);
    }

    @Override
    @Transactional
    public Article updateArticle(ArticleUpdateReqVO articleUpdateReqVO) {
        ArticleRespVO articleById = articleMapper.getArticleById(articleUpdateReqVO.getId());
        if (null == articleById) {
            throw new ServiceException(ErrorCode.ARTICLE_NOT_EXIST);
        }
        // 验证slug是否重复
        Article queryBySlug = articleMapper.getBySlug(articleUpdateReqVO.getSlug());
        if (null != queryBySlug && !articleById.getId().equals(queryBySlug.getId())) {
            throw new ServiceException(ARTICLE_SLUG_EXIST);
        }
        // 获取新增的标签,将新增的标签入库
        List<Tag> tagList = tagService.batchAddTagByName(articleUpdateReqVO.getAddTags());
        for (Tag tag : tagList) {
            articleUpdateReqVO.getTagIds().add(tag.getId());
        }

        Article article = ArticleConvert.INSTANCE.convertModelByUpdateArticleVO(articleUpdateReqVO);
        article.setSummary(genSummary(article.getSummary(), article.getParseContent()));
        articleMapper.updateById(article);

        // 处理标签关联关系
        List<ArticleTag> articleTagList = new ArrayList<>();
        for (Integer tagId : articleUpdateReqVO.getTagIds()) {
            ArticleTag articleTag = new ArticleTag();
            articleTag.setArticleId(article.getId());
            articleTag.setTagId(tagId);
            articleTagList.add(articleTag);
        }
        articleTagMapper.delByArticleId(articleUpdateReqVO.getId());
        articleTagMapper.insertBatch(articleTagList);

        // 处理分类关联关系
        List<ArticleCategory> articleCategoryList = new ArrayList<>();
        for (Integer categoryId : articleUpdateReqVO.getCategoryIds()) {
            ArticleCategory articleCategory = new ArticleCategory();
            articleCategory.setArticleId(article.getId());
            articleCategory.setCategoryId(categoryId);
            articleCategoryList.add(articleCategory);
        }
        articleCategoryMapper.delByArticleId(articleUpdateReqVO.getId());
        articleCategoryMapper.insertBatch(articleCategoryList);
        return article;
    }

    /**
     * 生成文章摘要
     * @param summary summary
     * @param parseContent parseContent
     * @return String
     */
    private String genSummary(String summary, String parseContent) {
        if (StringUtils.isNotBlank(summary)) {
            return summary;
        }
        OptionDTO option = optionCacheService.getOption(OptionEnum.WEB_AUTO_GEN_SUMMARY.getKey());
        if (null != option && null != option.getValue() && !option.getValue().equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
            return summary;
        }
        String cleanHtmlTag = HtmlUtil.cleanHtmlTag(parseContent);
        if (cleanHtmlTag.length() > 200){
            return cleanHtmlTag.substring(0, 200);
        }
        return cleanHtmlTag;
    }

}
