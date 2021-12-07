package com.perfree.controller.api.pub;

import com.perfree.base.BaseApiController;
import com.perfree.commons.Pager;
import com.perfree.model.Comment;
import com.perfree.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@CrossOrigin
@Api(value = "评论相关",tags = "评论相关")
@RequestMapping("/api/comment")
public class CommentController extends BaseApiController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/getCommentByArticleId")
    @ApiOperation(value = "根据文章ID获取评论分页列表", notes = "根据文章ID获取评论分页列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "articleId", value = "文章id", dataTypeClass = Integer.class, paramType = "query"),
    })
    public Pager<Comment> getCommentByArticleId(@ApiIgnore Pager<Comment> pager, @ApiIgnore Long articleId) {
        pager.setForm(new Comment());
        pager.getForm().setArticleId(articleId);
        return commentService.getApiCommentByArticleId(pager);
    }
}
