package com.perfree.service.article;

import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.http.HtmlUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.MyBatisUtils;
import com.perfree.commons.utils.ServletUtils;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.constant.ArticleConstant;
import com.perfree.constant.OptionConstant;
import com.perfree.controller.auth.article.vo.*;
import com.perfree.controller.auth.journal.vo.JournalAddReqVO;
import com.perfree.controller.auth.journal.vo.JournalPageReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.controller.auth.journal.vo.JournalUpdateReqVO;
import com.perfree.controller.common.article.vo.ArchivePageReqVO;
import com.perfree.controller.common.article.vo.ArchiveRespVO;
import com.perfree.convert.article.ArticleConvert;
import com.perfree.convert.journalAttach.JournalAttachConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.mapper.ArticleMapper;
import com.perfree.model.Article;
import com.perfree.model.JournalAttach;
import com.perfree.model.Tag;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.service.articleCategory.ArticleCategoryService;
import com.perfree.service.articleTag.ArticleTagService;
import com.perfree.service.comment.CommentService;
import com.perfree.service.journal.JournalAttachService;
import com.perfree.service.tag.TagService;
import com.perfree.system.api.option.dto.OptionDTO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private ArticleTagService articleTagService;

    @Resource
    private ArticleCategoryService articleCategoryService;

    @Resource
    private TagService tagService;

    @Resource
    private OptionCacheService optionCacheService;

    @Resource
    private JournalAttachService journalAttachService;

    @Resource
    private CommentService commentService;

    @Override
    public PageResult<ArticleRespVO> articlePage(ArticlePageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("isTop", SortingField.ORDER_DESC),
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        IPage<ArticleRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<ArticleRespVO> articlePage = articleMapper.articlePage(page, pageVO, SecurityFrameworkUtils.getLoginUserId());
        return new PageResult<>(articlePage.getRecords(), articlePage.getTotal());
    }

    @Override
    @Transactional
    public Article createArticle(ArticleAddReqVO articleAddReqVO) {
        // 验证slug是否重复
        Article queryBySlug = articleMapper.getBySlugAndType(articleAddReqVO.getSlug(), articleAddReqVO.getType());
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
        article.setGreatCount(SystemConstants.DEFAULT_COUNT);
        article.setSummary(genSummary(article.getSummary(), article.getParseContent()));
        articleMapper.insert(article);

        // 处理标签关联关系
        articleTagService.handleArticleTag(articleAddReqVO.getTagIds(), article.getId());

        // 处理分类关联关系
        articleCategoryService.handleArticleCategory(articleAddReqVO.getCategoryIds(), article.getId());
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
        articleCategoryService.delByArticleId(id);
        articleTagService.delByArticleId(id);
        articleMapper.deleteById(id);
        commentService.delByArticleId(id);
        return true;
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
        ArticleRespVO articleById = articleMapper.getArticleById(id);
        if (articleById.getStatus().equals(ArticleConstant.ARTICLE_STATUS_ONLY_SELF) && !articleById.getUser().getId().equals(SecurityFrameworkUtils.getLoginUserId())) {
            throw new ServiceException(ErrorCode.NO_PERMISSION_PREVIEW);
        }
        return articleById;
    }

    @Override
    @Transactional
    public Article updateArticle(ArticleUpdateReqVO articleUpdateReqVO) {
        ArticleRespVO articleById = articleMapper.getArticleById(articleUpdateReqVO.getId());
        if (null == articleById) {
            throw new ServiceException(ErrorCode.ARTICLE_NOT_EXIST);
        }
        // 验证slug是否重复
        Article queryBySlug = articleMapper.getBySlugAndType(articleUpdateReqVO.getSlug(), articleUpdateReqVO.getType());
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
        articleTagService.handleArticleTag(articleUpdateReqVO.getTagIds(), article.getId());

        // 处理分类关联关系
        articleCategoryService.handleArticleCategory(articleUpdateReqVO.getCategoryIds(), article.getId());
        return article;
    }

    @Override
    @Transactional
    public Boolean updateGreatCount(Integer id) {
        return articleMapper.updateGreatCount(id);
    }

    @Override
    @Transactional
    public JournalRespVO createJournal(JournalAddReqVO journalAddReqVO) {
        if (StringUtils.isBlank(journalAddReqVO.getContent()) && (null == journalAddReqVO.getAttachList() || journalAddReqVO.getAttachList().isEmpty())){
            throw new ServiceException(ErrorCode.JOURNAL_NOT_EMPTY);
        }
        Article article = ArticleConvert.INSTANCE.convertByJournalAddReqVO(journalAddReqVO);
        article.setType(ArticleConstant.ARTICLE_TYPE_JOURNAL);
        article.setTitle(genSummary("", article.getParseContent()));
        articleMapper.insert(article);
        List<JournalAttach> journalAttachList = journalAttachService.handleJournalAttach(journalAddReqVO.getAttachList(), article.getId());
        JournalRespVO journalRespVO = ArticleConvert.INSTANCE.convertToJournalResp(article);
        journalRespVO.setAttachList(JournalAttachConvert.INSTANCE.convertToRespVOList(journalAttachList));
        return journalRespVO;
    }

    @Override
    public PageResult<JournalRespVO> journalPage(JournalPageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("isTop", SortingField.ORDER_DESC),
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        IPage<JournalRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<JournalRespVO> journalPage = articleMapper.journalPage(page, pageVO, SecurityFrameworkUtils.getLoginUserId());
        return new PageResult<>(journalPage.getRecords(), journalPage.getTotal());
    }

    @Override
    public JournalRespVO getJournalById(Integer id) {
        JournalRespVO journalById = articleMapper.getJournalById(id);
        if (journalById.getStatus().equals(ArticleConstant.ARTICLE_STATUS_ONLY_SELF) && !journalById.getUser().getId().equals(SecurityFrameworkUtils.getLoginUserId())) {
            throw new ServiceException(ErrorCode.NO_PERMISSION_PREVIEW);
        }
        return journalById;
    }

    @Override
    public JournalRespVO updateJournal(JournalUpdateReqVO updateReqVO) {
        if (StringUtils.isBlank(updateReqVO.getContent()) && (null == updateReqVO.getAttachList() || updateReqVO.getAttachList().isEmpty())){
            throw new ServiceException(ErrorCode.JOURNAL_NOT_EMPTY);
        }
        Article article = ArticleConvert.INSTANCE.convertByJournalUpdateReqVO(updateReqVO);
        article.setTitle(genSummary("", article.getParseContent()));
        articleMapper.updateById(article);
        journalAttachService.delByArticleId(article.getId());
        List<JournalAttach> journalAttachList = journalAttachService.handleJournalAttach(updateReqVO.getAttachList(), article.getId());
        JournalRespVO journalRespVO = ArticleConvert.INSTANCE.convertToJournalResp(article);
        journalRespVO.setAttachList(JournalAttachConvert.INSTANCE.convertToRespVOList(journalAttachList));
        return journalRespVO;
    }

    @Override
    public List<Article> getAllPage() {
        return articleMapper.getAllPage();
    }

    @Override
    public PageResult<ArchiveRespVO> archivePage(ArchivePageReqVO pageVO) {
        IPage<ArchiveRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<ArchiveRespVO> articlePage = articleMapper.archivePage(page, pageVO);
        return new PageResult<>(articlePage.getRecords(), articlePage.getTotal());
    }

    @Override
    public List<ArticleRespVO> getLatestArticle(Integer num) {
        return articleMapper.getLatestArticle(num);
    }

    @Override
    public List<ArticleRespVO> getHotArticleByCommentCount(Integer num) {
        return articleMapper.getHotArticleByCommentCount(num);
    }

    @Override
    public List<ArticleRespVO> getHotArticleByViewCount(Integer num) {
        return articleMapper.getHotArticleByViewCount(num);
    }

    @Override
    public void viewCountHandle(HttpServletRequest request, HttpServletResponse response, Integer id) {
        String cookie = ServletUtils.getCookie(request, SystemConstants.COOKIE_ARTICLE_VIEW);
        if (StringUtils.isNotBlank(cookie)) {
            String[] split = cookie.split("_");
            if (ArrayUtil.contains(split, String.valueOf(id))){
                return;
            }
        }
        articleMapper.updateViewCount(id);
        ServletUtils.addCookie(response,  SystemConstants.COOKIE_ARTICLE_VIEW, String.valueOf(id), 60 * 60);
    }

    @Override
    public ArticleRespVO getBySlug(String slug) {
        return articleMapper.getBySlug(slug);
    }

    @Override
    public List<ArticleRespVO> getHotArticleByGreatCount(Integer num) {
        return articleMapper.getHotArticleByGreatCount(num);
    }

    @Override
    public Boolean updateVisibility(ArticleUpdateVisibilityReqVO updateReqVO) {
        Article article = ArticleConvert.INSTANCE.convertModelByVisibilityVO(updateReqVO);
        articleMapper.updateById(article);
        return true;
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
        OptionDTO option = optionCacheService.getOption(OptionEnum.WEB_AUTO_GEN_SUMMARY.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING);
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
