package com.perfree.controller.admin;

import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import com.perfree.service.TagService;
import com.perfree.service.UserService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={"admin","superAdmin"}, logical= Logical.OR)
public class DashboardController extends BaseController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private TagService tagService;

    @Autowired
    private UserService userService;

    @RequestMapping("/dashboard")
    public String index(Model model) {
        model.addAttribute("articleCount", articleService.getArticleCount());
        model.addAttribute("commentCount", commentService.getCommentCount());
        model.addAttribute("tagCount", tagService.getTagCount());
        model.addAttribute("userCount", userService.getUserCount());
        return view("static/admin/pages/dashboard/dashboard.html");
    }

    /**
     * 获取最新文章列表
     * @return ResponseBean
     */
    @GetMapping("/dashboard/getArticleList")
    @ResponseBody
    public ResponseBean getArticleList(){
        return ResponseBean.success("获取成功", articleService.getArticleListByDashboard());
    }


    /**
     * 获取最新评论列表
     * @return ResponseBean
     */
    @GetMapping("/dashboard/getCommentList")
    @ResponseBody
    public ResponseBean getCommentList(){
        return ResponseBean.success("获取成功", commentService.getCommentListByDashboard());
    }
}
