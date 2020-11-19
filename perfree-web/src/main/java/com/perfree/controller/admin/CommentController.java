package com.perfree.controller.admin;

import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Comment;
import com.perfree.model.Menu;
import com.perfree.service.CommentService;
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
public class CommentController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(TagController.class);
    @Autowired
    private CommentService commentService;

    /**
     * 评论管理列表页
     * @return String
     */
    @RequestMapping("/comment")
    public String index() {
        return "admin/pages/comment/comment_list";
    }

    /**
     * 评论管理列表数据
     * @return String
     */
    @PostMapping("/comment/list")
    @ResponseBody
    public Pager<Comment> list(@RequestBody Pager<Comment> pager) {
        return commentService.list(pager);
    }

    /**
     * 删除评论
     * @return String
     */
    @PostMapping("/comment/del")
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
    @ResponseBody
    public ResponseBean changeStatus(@RequestBody Comment comment) {
        if (commentService.changeStatus(comment) > 0) {
            return ResponseBean.success("操作成功", null);
        }
        logger.error("评论操作失败: {}", comment.toString());
        return ResponseBean.fail("操作失败", null);
    }

}
