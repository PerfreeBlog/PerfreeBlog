package com.perfree.controller.auth.comment;

import com.perfree.service.comment.CommentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "评论相关接口")
@RequestMapping("api/auth/comment")
public class CommentController {

    @Resource
    private CommentService commentService;

}
