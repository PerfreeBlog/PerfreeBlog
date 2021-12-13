package com.perfree.controller.admin;

import com.perfree.commons.Constants;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseController;
import com.perfree.model.Comment;
import com.perfree.model.User;
import com.perfree.permission.AdminMenu;
import com.perfree.service.CommentService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
public class CommentController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(TagController.class);
    @Autowired
    private CommentService commentService;

    /**
     * 评论管理列表页
     * @return String
     */
    @RequestMapping("/comment")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    @AdminMenu(name = "评论管理", seq = 3, groupId = Constants.ADMIN_MENU_GROUP_CONTENT,
            role = {Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE})
    public String index() {
        return view("static/admin/pages/comment/comment_list.html");
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

}
