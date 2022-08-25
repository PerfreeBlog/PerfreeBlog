package com.perfree.controller.admin;

import cn.hutool.http.HtmlUtil;
import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Comment;
import com.perfree.model.User;
import com.perfree.permission.AdminMenu;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import com.perfree.service.MailService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
public class CommentController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(TagController.class);
    @Autowired
    private CommentService commentService;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private MailService mailService;

    /**
     * 评论管理列表页
     * @return String
     */
    @RequestMapping("/comment")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    @AdminMenu(name = "评论管理", seq = 4, groupId = Constants.ADMIN_MENU_GROUP_CONTENT,
            role = {Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE})
    public String index() {
        return view("static/admin/pages/comment/comment_list.html");
    }


    /**
     * 评论回复页
     * @return String
     */
    @RequestMapping("/comment/reply/{id}")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public String reply(@PathVariable("id") String id, Model model) {
        model.addAttribute("comment", commentService.getById(Long.parseLong(id)));
        return view("static/admin/pages/comment/comment_reply.html");
    }

    /**
     * 评论管理列表数据
     * @return String
     */
    @PostMapping("/comment/list")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    @ResponseBody
    public Pager<Comment> list(@RequestBody Pager<Comment> pager) {
        User user = getUser();
        if (user.getRole().getCode().equals("contribute")) {
            return commentService.list(pager, user.getId().toString());
        }
        return commentService.list(pager, null);
    }

    /**
     * 删除评论
     * @return String
     */
    @PostMapping("/comment/del")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    @ResponseBody
    public ResponseBean del(@RequestBody String ids) {
        String[] idArr = ids.split(",");
        if (commentService.del(idArr) > 0) {
            return ResponseBean.success("删除成功", null);
        }
        logger.error("评论删除失败: {}", ids);
        return ResponseBean.fail("删除失败", null);
    }

    /**
     * 更改状态
     * @return String
     */
    @PostMapping("/comment/changeStatus")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    @ResponseBody
    public ResponseBean changeStatus(@RequestBody Comment comment) {
        if (commentService.changeStatus(comment) > 0) {
            return ResponseBean.success("操作成功", null);
        }
        logger.error("评论操作失败: {}", comment.toString());
        return ResponseBean.fail("操作失败", null);
    }


    @RequestMapping("/comment/reply")
    @ResponseBody
    public ResponseBean reply(@RequestBody @Valid Comment comment){
        comment.setReadAvatar(false);
        User user = getUser();
        user.setReadAvatar(false);
        comment.setUserId(user.getId());
        comment.setAvatar(user.getAvatar());
        comment.setEmail(user.getEmail());
        comment.setUserName(user.getUserName());
        comment.setWebsite(user.getWebsite());
        comment.setStatus(Constants.COMMENT_STATUS_NORMAL);
        comment.setContent(HtmlUtil.filter(comment.getContent()));
        if (commentService.add(comment) > 0) {
            mailService.commentMailSend(comment);
            return ResponseBean.success("评论成功", comment);
        }
        return ResponseBean.fail("评论失败", null);
    }

}
