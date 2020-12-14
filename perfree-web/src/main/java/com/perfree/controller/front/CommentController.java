package com.perfree.controller.front;

import cn.hutool.http.server.HttpServerRequest;
import com.perfree.controller.BaseController;
import com.perfree.model.Comment;
import com.perfree.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class CommentController extends BaseController {

    @Autowired
    private CommentService commentService;
    @RequestMapping("/comment/submitComment")
    public void submitComment(Comment comment,String anchor, HttpServletRequest request, HttpServletResponse response)throws IOException {
        commentService.add(comment, getUser());
        response.sendRedirect("/article/"+comment.getArticleId() + anchor);
    }
}
