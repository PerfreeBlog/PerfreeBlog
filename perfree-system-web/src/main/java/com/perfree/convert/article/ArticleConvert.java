package com.perfree.convert.article;


import com.perfree.controller.auth.article.vo.*;
import com.perfree.model.Article;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ArticleConvert {
    ArticleConvert INSTANCE = Mappers.getMapper(ArticleConvert.class);

    ArticleRespVO convertRespVO(Article article);

    Article convertModelByCreateArticleVO(ArticleAddReqVO articleAddReqVO);

    Article convertModelByIsCommentVO(ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO);

    Article convertModelByIsTopVO(ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO);

    Article convertModelByStatusVO(ArticleUpdateStatusReqVO articleUpdateStatusReqVO);

    Article convertModelByUpdateArticleVO(ArticleUpdateReqVO articleUpdateReqVO);

}
