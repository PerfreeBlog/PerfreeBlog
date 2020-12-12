package com.perfree.controller.front;

import cn.hutool.http.server.HttpServerRequest;
import com.perfree.controller.BaseController;
import com.perfree.model.Comment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class CommentController extends BaseController {

    @RequestMapping("/comment/submitComment")
    public void submitComment(Comment comment,String anchor, HttpServletRequest request, HttpServletResponse response)throws IOException {
        System.out.println(request.getContextPath());
        response.sendRedirect("/article/"+comment.getArticleId() + anchor);
    }
}
