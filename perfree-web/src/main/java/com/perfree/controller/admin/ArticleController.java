package com.perfree.controller.admin;

import com.perfree.commons.Constants;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseController;
import com.perfree.model.Article;
import com.perfree.model.User;
import com.perfree.permission.AdminMenu;
import com.perfree.service.ArticleService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * 文章
 */
@Controller
@RequestMapping("/admin")
public class ArticleController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(ArticleController.class);
    @Autowired
    private ArticleService articleService;

    @RequiresRoles(value={"admin","editor", "contribute"}, logical= Logical.OR)
    @RequestMapping("/article")
    @AdminMenu(name = "文章管理", seq = 1, groupId = Constants.ADMIN_MENU_GROUP_CONTENT,
            role = {Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE})
    public String index() {
        return view("static/admin/pages/article/article_list.html");
    }

    @RequiresRoles(value={"admin","editor", "contribute"}, logical= Logical.OR)
    @RequestMapping("/article/addPage")
    public String addPage() {
        return view("static/admin/pages/article/article_create.html");
    }

    @RequiresRoles(value={"admin","editor", "contribute"}, logical= Logical.OR)
    @RequestMapping("/article/updatePage/{id}")
    public String updatePage(@PathVariable("id") String id, Model model) {
        Article article = articleService.getById(id);
        model.addAttribute("article", article);
        return view("/static/admin/pages/article/article_update.html");
    }

    /**
     * 添加文章
     * @return String
     */
    @PostMapping("/article/add")
    @ResponseBody
    @RequiresRoles(value={"admin","editor", "contribute"}, logical= Logical.OR)
    public ResponseBean add(@RequestBody @Valid Article article) {
        User user = getUser();
        article.setUserId(user.getId());
        if(user.getRole().getCode().equals("contribute")) {
            article.setStatus(Constants.ARTICLE_STATUS_AUDIT);
        }
        if (articleService.add(article) > 0) {
            return ResponseBean.success("添加成功", article);
        }
        logger.error("文章添加失败: {}", article.toString());
        return ResponseBean.fail("添加失败", null);
    }

    /**
     * 更新文章
     * @return String
     */
    @PostMapping("/article/update")
    @ResponseBody
    @RequiresRoles(value={"admin","editor", "contribute"}, logical= Logical.OR)
    public ResponseBean update(@RequestBody @Valid Article article) {
        if (articleService.update(article) > 0) {
            return ResponseBean.success("更新成功", article);
        }
        logger.error("文章更新失败: {}", article.toString());
        return ResponseBean.fail("更新失败", null);
    }

    /**
     * 文章管理列表数据
     * @return Pager<Article>
     */
    @RequiresRoles(value={"admin","editor", "contribute"}, logical= Logical.OR)
    @PostMapping("/article/list")
    @ResponseBody
    public Pager<Article> list(@RequestBody Pager<Article> pager) {
        User user = getUser();
        if (user.getRole().getCode().equals("contribute")) {
            pager.getForm().setUserId(user.getId());
        }
        return articleService.list(pager);
    }


    /**
     * 更改置顶状态
     * @return String
     */
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    @PostMapping("/article/changeTopStatus")
    @ResponseBody
    public ResponseBean changeTopStatus(@RequestBody Article article) {
        if (articleService.changeTopStatus(article) > 0) {
            return ResponseBean.success("修改成功", null);
        }
        logger.error("文章修改失败: {}", article.toString());
        return ResponseBean.fail("修改失败", null);
    }


    /**
     * 更改文章是否可以评论
     * @return String
     */
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    @PostMapping("/article/changeCommentStatus")
    @ResponseBody
    public ResponseBean changeCommentStatus(@RequestBody Article article) {
        if (articleService.changeCommentStatus(article) > 0) {
            return ResponseBean.success("修改成功", null);
        }
        logger.error("文章修改失败: {}", article.toString());
        return ResponseBean.fail("修改失败", null);
    }

    /**
     * 更改文章状态
     * @return String
     */
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    @PostMapping("/article/changeStatus")
    @ResponseBody
    public ResponseBean changeStatus(@RequestBody Article article) {
        if (articleService.changeStatus(article) > 0) {
            return ResponseBean.success("修改成功", null);
        }
        logger.error("文章修改失败: {}", article.toString());
        return ResponseBean.fail("修改失败", null);
    }

    /**
     * 删除文章
     * @param ids ids
     * @return ResponseBean
     */
    @RequiresRoles(value={"admin","editor", "contribute"}, logical= Logical.OR)
    @PostMapping("/article/del")
    @ResponseBody
    public ResponseBean del(@RequestBody String ids) {
        String[] idArr = ids.split(",");
        if (articleService.del(idArr) > 0) {
            return ResponseBean.success("删除成功", null);
        }
        logger.error("文章删除失败: {}", ids);
        return ResponseBean.fail("删除失败", null);
    }

}
