package com.perfree.convert.article;

import com.perfree.controller.auth.article.vo.ArticleAddReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.controller.auth.article.vo.ArticleUpdateIsCommentReqVO;
import com.perfree.controller.auth.article.vo.ArticleUpdateIsTopReqVO;
import com.perfree.controller.auth.article.vo.ArticleUpdateReqVO;
import com.perfree.controller.auth.article.vo.ArticleUpdateStatusReqVO;
import com.perfree.controller.auth.article.vo.ArticleUpdateVisibilityReqVO;
import com.perfree.controller.auth.journal.vo.JournalAddReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.controller.auth.journal.vo.JournalUpdateReqVO;
import com.perfree.model.Article;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:59+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class ArticleConvertImpl implements ArticleConvert {

    @Override
    public ArticleRespVO convertRespVO(Article article) {
        if ( article == null ) {
            return null;
        }

        ArticleRespVO articleRespVO = new ArticleRespVO();

        articleRespVO.setTitle( article.getTitle() );
        articleRespVO.setContent( article.getContent() );
        articleRespVO.setContentModel( article.getContentModel() );
        articleRespVO.setParseContent( article.getParseContent() );
        articleRespVO.setType( article.getType() );
        articleRespVO.setStatus( article.getStatus() );
        articleRespVO.setSummary( article.getSummary() );
        articleRespVO.setMetaKeywords( article.getMetaKeywords() );
        articleRespVO.setMetaDescription( article.getMetaDescription() );
        articleRespVO.setThumbnail( article.getThumbnail() );
        articleRespVO.setSlug( article.getSlug() );
        articleRespVO.setIsTop( article.getIsTop() );
        articleRespVO.setIsComment( article.getIsComment() );
        articleRespVO.setFlag( article.getFlag() );
        articleRespVO.setTemplate( article.getTemplate() );
        articleRespVO.setVisibility( article.getVisibility() );
        articleRespVO.setId( article.getId() );
        articleRespVO.setViewCount( article.getViewCount() );
        articleRespVO.setGreatCount( article.getGreatCount() );
        if ( article.getCreateTime() != null ) {
            articleRespVO.setCreateTime( Date.from( article.getCreateTime().toInstant( ZoneOffset.UTC ) ) );
        }
        if ( article.getUpdateTime() != null ) {
            articleRespVO.setUpdateTime( Date.from( article.getUpdateTime().toInstant( ZoneOffset.UTC ) ) );
        }

        return articleRespVO;
    }

    @Override
    public Article convertModelByCreateArticleVO(ArticleAddReqVO articleAddReqVO) {
        if ( articleAddReqVO == null ) {
            return null;
        }

        Article article = new Article();

        article.setTitle( articleAddReqVO.getTitle() );
        article.setContent( articleAddReqVO.getContent() );
        article.setContentModel( articleAddReqVO.getContentModel() );
        article.setParseContent( articleAddReqVO.getParseContent() );
        article.setType( articleAddReqVO.getType() );
        article.setSummary( articleAddReqVO.getSummary() );
        article.setMetaKeywords( articleAddReqVO.getMetaKeywords() );
        article.setMetaDescription( articleAddReqVO.getMetaDescription() );
        article.setThumbnail( articleAddReqVO.getThumbnail() );
        article.setSlug( articleAddReqVO.getSlug() );
        article.setIsTop( articleAddReqVO.getIsTop() );
        article.setStatus( articleAddReqVO.getStatus() );
        article.setIsComment( articleAddReqVO.getIsComment() );
        article.setFlag( articleAddReqVO.getFlag() );
        article.setTemplate( articleAddReqVO.getTemplate() );
        article.setVisibility( articleAddReqVO.getVisibility() );

        return article;
    }

    @Override
    public Article convertModelByIsCommentVO(ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO) {
        if ( articleUpdateIsCommentReqVO == null ) {
            return null;
        }

        Article article = new Article();

        article.setId( articleUpdateIsCommentReqVO.getId() );
        article.setIsComment( articleUpdateIsCommentReqVO.getIsComment() );

        return article;
    }

    @Override
    public Article convertModelByIsTopVO(ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO) {
        if ( articleUpdateIsTopReqVO == null ) {
            return null;
        }

        Article article = new Article();

        article.setId( articleUpdateIsTopReqVO.getId() );
        article.setIsTop( articleUpdateIsTopReqVO.getIsTop() );

        return article;
    }

    @Override
    public Article convertModelByStatusVO(ArticleUpdateStatusReqVO articleUpdateStatusReqVO) {
        if ( articleUpdateStatusReqVO == null ) {
            return null;
        }

        Article article = new Article();

        article.setId( articleUpdateStatusReqVO.getId() );
        article.setStatus( articleUpdateStatusReqVO.getStatus() );

        return article;
    }

    @Override
    public Article convertModelByUpdateArticleVO(ArticleUpdateReqVO articleUpdateReqVO) {
        if ( articleUpdateReqVO == null ) {
            return null;
        }

        Article article = new Article();

        article.setId( articleUpdateReqVO.getId() );
        article.setTitle( articleUpdateReqVO.getTitle() );
        article.setContent( articleUpdateReqVO.getContent() );
        article.setContentModel( articleUpdateReqVO.getContentModel() );
        article.setParseContent( articleUpdateReqVO.getParseContent() );
        article.setType( articleUpdateReqVO.getType() );
        article.setSummary( articleUpdateReqVO.getSummary() );
        article.setMetaKeywords( articleUpdateReqVO.getMetaKeywords() );
        article.setMetaDescription( articleUpdateReqVO.getMetaDescription() );
        article.setThumbnail( articleUpdateReqVO.getThumbnail() );
        article.setSlug( articleUpdateReqVO.getSlug() );
        article.setIsTop( articleUpdateReqVO.getIsTop() );
        article.setStatus( articleUpdateReqVO.getStatus() );
        article.setIsComment( articleUpdateReqVO.getIsComment() );
        article.setFlag( articleUpdateReqVO.getFlag() );
        article.setTemplate( articleUpdateReqVO.getTemplate() );
        article.setVisibility( articleUpdateReqVO.getVisibility() );

        return article;
    }

    @Override
    public Article convertByJournalAddReqVO(JournalAddReqVO journalAddReqVO) {
        if ( journalAddReqVO == null ) {
            return null;
        }

        Article article = new Article();

        article.setContent( journalAddReqVO.getContent() );
        article.setContentModel( journalAddReqVO.getContentModel() );
        article.setParseContent( journalAddReqVO.getParseContent() );
        article.setVisibility( journalAddReqVO.getVisibility() );

        return article;
    }

    @Override
    public JournalRespVO convertToJournalResp(Article article) {
        if ( article == null ) {
            return null;
        }

        JournalRespVO journalRespVO = new JournalRespVO();

        journalRespVO.setId( article.getId() );
        journalRespVO.setGreatCount( article.getGreatCount() );
        if ( article.getCreateTime() != null ) {
            journalRespVO.setCreateTime( Date.from( article.getCreateTime().toInstant( ZoneOffset.UTC ) ) );
        }
        if ( article.getUpdateTime() != null ) {
            journalRespVO.setUpdateTime( Date.from( article.getUpdateTime().toInstant( ZoneOffset.UTC ) ) );
        }
        journalRespVO.setContent( article.getContent() );
        journalRespVO.setContentModel( article.getContentModel() );
        journalRespVO.setParseContent( article.getParseContent() );
        journalRespVO.setStatus( article.getStatus() );
        journalRespVO.setIsTop( article.getIsTop() );
        journalRespVO.setIsComment( article.getIsComment() );
        journalRespVO.setVisibility( article.getVisibility() );

        return journalRespVO;
    }

    @Override
    public Article convertByJournalUpdateReqVO(JournalUpdateReqVO updateReqVO) {
        if ( updateReqVO == null ) {
            return null;
        }

        Article article = new Article();

        article.setId( updateReqVO.getId() );
        article.setContent( updateReqVO.getContent() );
        article.setContentModel( updateReqVO.getContentModel() );
        article.setParseContent( updateReqVO.getParseContent() );
        article.setVisibility( updateReqVO.getVisibility() );

        return article;
    }

    @Override
    public List<ArticleRespVO> convertToRespList(List<Article> articleList) {
        if ( articleList == null ) {
            return null;
        }

        List<ArticleRespVO> list = new ArrayList<ArticleRespVO>( articleList.size() );
        for ( Article article : articleList ) {
            list.add( convertRespVO( article ) );
        }

        return list;
    }

    @Override
    public Article convertModelByVisibilityVO(ArticleUpdateVisibilityReqVO updateReqVO) {
        if ( updateReqVO == null ) {
            return null;
        }

        Article article = new Article();

        article.setId( updateReqVO.getId() );
        article.setVisibility( updateReqVO.getVisibility() );

        return article;
    }
}
