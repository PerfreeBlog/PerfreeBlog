package com.perfree.controller.common.comment;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "评论相关接口")
@RequestMapping("api/comment")
public class CommentController {

    @Resource
    private CommentService commentService;

    @PostMapping("/pageByArticleId")
    @Operation(summary = "根据文章id获取评论分页列表(顶级)")
    public CommonResult<PageResult<CommentRespVO>> pageByArticleId(@Valid @RequestBody CommentPageByArticleIdReqVO pageVo) {
        PageResult<CommentRespVO> commentPageResult = commentService.pageByArticleId(pageVo);
        return success(commentPageResult);
    }

    @PostMapping("/pageByTopPid")
    @Operation(summary = "根据topPid获取所有子级评论信息")
    public CommonResult<PageResult<CommentRespVO>> pageByTopPid(@Valid @RequestBody CommentPageByTopPidReqVO pageVO) {
        return CommonResult.success(commentService.pageByTopPid(pageVO));
    }

    @PostMapping("/submitComment")
    @Operation(summary = "提交评论")
    public CommonResult<CommentRespVO> submitComment(@Valid @RequestBody CommentAddReqVO reqVO) {
        return success(CommentConvert.INSTANCE.convertToRespVO(commentService.addComment(reqVO)));
    }
}