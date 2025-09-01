package com.perfree.convert.article;


import com.perfree.controller.auth.article.vo.*;
import com.perfree.controller.auth.journal.vo.JournalAddReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.controller.auth.journal.vo.JournalUpdateReqVO;
import com.perfree.model.Article;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticleConvert {
    ArticleConvert INSTANCE = Mappers.getMapper(ArticleConvert.class);

    ArticleRespVO convertRespVO(Article article);

    Article convertModelByCreateArticleVO(ArticleAddReqVO articleAddReqVO);

    Article convertModelByIsCommentVO(ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO);

    Article convertModelByIsTopVO(ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO);

    Article convertModelByStatusVO(ArticleUpdateStatusReqVO articleUpdateStatusReqVO);

    Article convertModelByUpdateArticleVO(ArticleUpdateReqVO articleUpdateReqVO);

    Article convertByJournalAddReqVO(JournalAddReqVO journalAddReqVO);

    JournalRespVO convertToJournalResp(Article article);

    Article convertByJournalUpdateReqVO(JournalUpdateReqVO updateReqVO);

    List<ArticleRespVO> convertToRespList(List<Article> articleList);

    Article convertModelByVisibilityVO(ArticleUpdateVisibilityReqVO updateReqVO);

}
