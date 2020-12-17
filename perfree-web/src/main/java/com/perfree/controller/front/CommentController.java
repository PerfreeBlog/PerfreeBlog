package com.perfree.controller.front;

import com.perfree.controller.BaseController;
import com.perfree.model.Article;
import com.perfree.model.Comment;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
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
    @Autowired
    private ArticleService articleService;

    @RequestMapping("/comment/submitComment")
    @RequiresRoles(value={"admin", "superAdmin","user"}, logical= Logical.OR)
    public void submitComment(Comment comment,String anchor, HttpServletRequest request, HttpServletResponse response)throws IOException {
        Article article = articleService.getById(comment.getArticleId().toString());
        if(article.getIsComment() == 0) {
            return;
        }
        commentService.add(comment, getUser());
        response.sendRedirect("/article/"+comment.getArticleId() + anchor);
    }
}
