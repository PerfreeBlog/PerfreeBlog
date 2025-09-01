package com.perfree.controller.common.comment;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.controller.auth.comment.vo.CommentAddReqVO;
import com.perfree.controller.auth.comment.vo.CommentRespVO;
import com.perfree.controller.common.comment.vo.CommentPageByArticleIdReqVO;
import com.perfree.controller.common.comment.vo.CommentPageByTopPidReqVO;
import com.perfree.convert.comment.CommentConvert;
import com.perfree.service.comment.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "评论相关接口")
@Mapping("api/comment")
public class CommentController {

    @Inject
    private CommentService commentService;

    @Post
    @Mapping("/pageByArticleId")
    @Operation(summary = "根据文章id获取评论分页列表(顶级)")
    public CommonResult<PageResult<CommentRespVO>> pageByArticleId(@Valid @Body CommentPageByArticleIdReqVO pageVo) {
        PageResult<CommentRespVO> commentPageResult = commentService.pageByArticleId(pageVo);
        return success(commentPageResult);
    }

    @Post
    @Mapping("/pageByTopPid")
    @Operation(summary = "根据topPid获取所有子级评论信息")
    public CommonResult<PageResult<CommentRespVO>> pageByTopPid(@Valid @Body CommentPageByTopPidReqVO pageVO) {
        return CommonResult.success(commentService.pageByTopPid(pageVO));
    }

    @Post
    @Mapping("/submitComment")
    @Operation(summary = "提交评论")
    public CommonResult<CommentRespVO> submitComment(@Valid @Body CommentAddReqVO reqVO) {
        return success(CommentConvert.INSTANCE.convertToRespVO(commentService.addComment(reqVO)));
    }

    @Get
    @Mapping("getLatestComment")
    @Operation(summary = "获取最新评论")
    public CommonResult<List<CommentRespVO>> getLatestComment(@Param("num") Integer num) {
        List<CommentRespVO> latestArticle = commentService.getLatestComment(num);
        return success(latestArticle);
    }

    @Get
    @Mapping("getCommentByArticleId")
    @Operation(summary = "根据文章id获取所有评论")
    public CommonResult<List<CommentRespVO>> getCommentByArticleId(@Param("articleId") Integer articleId) {
        List<CommentRespVO> latestArticle = commentService.getCommentByArticleId(articleId);
        return success(latestArticle);
    }
}
