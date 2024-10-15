package com.perfree.convert.comment;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.comment.vo.CommentAddReqVO;
import com.perfree.controller.auth.comment.vo.CommentRespVO;
import com.perfree.controller.auth.comment.vo.CommentUpdateStatusReqVO;
import com.perfree.model.Comment;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:58+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class CommentConvertImpl implements CommentConvert {

    @Override
    public PageResult<CommentRespVO> convertPageResultVO(PageResult<Comment> commentPageResult) {
        if ( commentPageResult == null ) {
            return null;
        }

        PageResult<CommentRespVO> pageResult = new PageResult<CommentRespVO>();

        pageResult.setList( commentListToCommentRespVOList( commentPageResult.getList() ) );
        pageResult.setTotal( commentPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public Comment convertByUpdateStatusReqVO(CommentUpdateStatusReqVO commentUpdateStatusReqVO) {
        if ( commentUpdateStatusReqVO == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setId( commentUpdateStatusReqVO.getId() );
        comment.setStatus( commentUpdateStatusReqVO.getStatus() );

        return comment;
    }

    @Override
    public CommentRespVO convertToRespVO(Comment comments) {
        if ( comments == null ) {
            return null;
        }

        CommentRespVO commentRespVO = new CommentRespVO();

        commentRespVO.setArticleId( comments.getArticleId() );
        commentRespVO.setPid( comments.getPid() );
        commentRespVO.setTopPid( comments.getTopPid() );
        commentRespVO.setUserId( comments.getUserId() );
        commentRespVO.setContent( comments.getContent() );
        commentRespVO.setAvatar( comments.getAvatar() );
        commentRespVO.setWebsite( comments.getWebsite() );
        commentRespVO.setEmail( comments.getEmail() );
        commentRespVO.setUserName( comments.getUserName() );
        commentRespVO.setDevice( comments.getDevice() );
        commentRespVO.setIp( comments.getIp() );
        commentRespVO.setId( comments.getId() );
        commentRespVO.setStatus( comments.getStatus() );
        if ( comments.getCreateTime() != null ) {
            commentRespVO.setCreateTime( Date.from( comments.getCreateTime().toInstant( ZoneOffset.UTC ) ) );
        }
        if ( comments.getUpdateTime() != null ) {
            commentRespVO.setUpdateTime( Date.from( comments.getUpdateTime().toInstant( ZoneOffset.UTC ) ) );
        }

        return commentRespVO;
    }

    @Override
    public Comment convertByAddReqVO(CommentAddReqVO reqVO) {
        if ( reqVO == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setArticleId( reqVO.getArticleId() );
        comment.setPid( reqVO.getPid() );
        comment.setTopPid( reqVO.getTopPid() );
        comment.setUserId( reqVO.getUserId() );
        comment.setContent( reqVO.getContent() );
        comment.setAvatar( reqVO.getAvatar() );
        comment.setWebsite( reqVO.getWebsite() );
        comment.setEmail( reqVO.getEmail() );
        comment.setUserName( reqVO.getUserName() );
        comment.setDevice( reqVO.getDevice() );
        comment.setIp( reqVO.getIp() );

        return comment;
    }

    protected List<CommentRespVO> commentListToCommentRespVOList(List<Comment> list) {
        if ( list == null ) {
            return null;
        }

        List<CommentRespVO> list1 = new ArrayList<CommentRespVO>( list.size() );
        for ( Comment comment : list ) {
            list1.add( convertToRespVO( comment ) );
        }

        return list1;
    }
}
