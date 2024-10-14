package com.perfree.controller.auth.comment;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.comment.vo.CommentChildPageReqVO;
import com.perfree.controller.auth.comment.vo.CommentPageReqVO;
import com.perfree.controller.auth.comment.vo.CommentRespVO;
import com.perfree.controller.auth.comment.vo.CommentUpdateStatusReqVO;
import com.perfree.controller.auth.tag.vo.TagUpdateReqVO;
import com.perfree.controller.common.comment.vo.CommentPageByTopPidReqVO;
import com.perfree.service.comment.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "评论相关接口")
@RequestMapping("api/auth/comment")
public class CommentController {

    @Resource
    private CommentService commentService;

    @PostMapping("/page")
    @Operation(summary = "评论分页列表")
    public CommonResult<PageResult<CommentRespVO>> page(@RequestBody CommentPageReqVO commentPageReqVO) {
        PageResult<CommentRespVO> commentPageResult = commentService.commentPage(commentPageReqVO);
        return success(commentPageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "获取评论信息")
    public CommonResult<CommentRespVO> get(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(commentService.queryById(id));
    }

    @PostMapping("/queryChildCommentPage")
    @Operation(summary = "获取子评论分页列表")
    public CommonResult<PageResult<CommentRespVO>> queryChildCommentPage(@RequestBody CommentChildPageReqVO pageReqVO) {
        return CommonResult.success(commentService.queryChildCommentPage(pageReqVO));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除评论")
    @PreAuthorize("@ss.hasPermission('admin:comment:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(commentService.del(id));
    }

    @PostMapping("/updateStatus")
    @Operation(summary = "修改评论状态")
    @PreAuthorize("@ss.hasPermission('admin:comment:audit')")
    public CommonResult<Boolean> updateStatus(@RequestBody @Valid CommentUpdateStatusReqVO commentUpdateStatusReqVO) {
        return CommonResult.success(commentService.updateStatus(commentUpdateStatusReqVO));
    }

}
