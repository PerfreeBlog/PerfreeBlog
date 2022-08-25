package com.perfree.controller.admin;

import com.perfree.commons.Constants;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseController;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import com.perfree.service.TagService;
import com.perfree.service.UserService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/admin")
public class DashboardController extends BaseController {
    @Value("${version}")
    private String version;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private TagService tagService;

    @Autowired
    private UserService userService;

    @RequestMapping("/dashboard")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE,
            Constants.ROLE_USER}, logical= Logical.OR)
    public String index(Model model) {
        model.addAttribute("articleCount", articleService.getArticleCount());
        model.addAttribute("commentCount", commentService.getCommentCount());
        model.addAttribute("tagCount", tagService.getTagCount());
        model.addAttribute("userCount", userService.getUserCount());
        model.addAttribute("version", version);
        return view("static/admin/pages/dashboard/dashboard.html");
    }

    /**
     * 获取最新文章列表
     * @return ResponseBean
     */
    @GetMapping("/dashboard/getArticleList")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE,
            Constants.ROLE_USER}, logical= Logical.OR)
    public ResponseBean getArticleList(int count){
        return ResponseBean.success("获取成功", articleService.getArticleListByDashboard(count));
    }


    /**
     * 获取最新评论列表
     * @return ResponseBean
     */
    @GetMapping("/dashboard/getCommentList")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE,
            Constants.ROLE_USER}, logical= Logical.OR)
    public ResponseBean getCommentList(int count){
        return ResponseBean.success("获取成功", commentService.getCommentListByDashboard(count));
    }
}
