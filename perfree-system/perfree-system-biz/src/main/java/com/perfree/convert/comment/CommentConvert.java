package com.perfree.convert.comment;


import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.comment.vo.CommentAddReqVO;
import com.perfree.controller.auth.comment.vo.CommentRespVO;
import com.perfree.controller.auth.comment.vo.CommentUpdateStatusReqVO;
import com.perfree.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentConvert {
    CommentConvert INSTANCE = Mappers.getMapper(CommentConvert.class);


    PageResult<CommentRespVO> convertPageResultVO(PageResult<Comment> commentPageResult);

    Comment convertByUpdateStatusReqVO(CommentUpdateStatusReqVO commentUpdateStatusReqVO);

    CommentRespVO convertToRespVO(Comment comments);

    Comment convertByAddReqVO(CommentAddReqVO reqVO);

}
