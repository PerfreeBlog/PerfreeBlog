package com.perfree.controller.auth.comment;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.perfree.base.BaseController;
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
import org.noear.solon.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;

@Controller
@Tag(name = "评论相关接口")
@Mapping("api/auth/comment")
public class CommentController extends BaseController {

    @Inject
    private CommentService commentService;

    @Post
    @Mapping("/page")
    @Operation(summary = "评论分页列表")
    public CommonResult<PageResult<CommentRespVO>> page(@Body CommentPageReqVO commentPageReqVO) {
        startPage(commentPageReqVO);
        List<CommentRespVO> commentRespVOList = commentService.commentPage(commentPageReqVO);
        return pageSuccess(commentRespVOList);
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "获取评论信息")
    public CommonResult<CommentRespVO> get(@Param(value = "id") Integer id) {
        return CommonResult.success(commentService.queryById(id));
    }

    @Post
    @Mapping("/queryChildCommentPage")  
    @Operation(summary = "获取子评论分页列表")
    public CommonResult<PageResult<CommentRespVO>> queryChildCommentPage(@Body CommentChildPageReqVO pageReqVO) {
        startPage(pageReqVO);
        return pageSuccess(commentService.queryChildCommentPage(pageReqVO));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "根据id删除评论")
    @SaCheckPermission("admin:comment:delete")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return CommonResult.success(commentService.del(id));
    }

    @Post
    @Mapping("/updateStatus")
    @Operation(summary = "修改评论状态")
    @SaCheckPermission("admin:comment:audit")
    public CommonResult<Boolean> updateStatus(@Body @Valid CommentUpdateStatusReqVO commentUpdateStatusReqVO) {
        return CommonResult.success(commentService.updateStatus(commentUpdateStatusReqVO));
    }

}
