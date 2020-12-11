package com.perfree.controller.admin;

import cn.hutool.http.HtmlUtil;
import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
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

    @RequestMapping("/article")
    public String index() {
        return "admin/pages/article/article_list";
    }

    @RequestMapping("/article/addPage")
    public String addPage() {
        return "admin/pages/article/article_create";
    }

    @RequestMapping("/article/updatePage/{id}")
    public String updatePage(@PathVariable("id") String id, Model model) {
        Article article = articleService.getById(id);
        model.addAttribute("article", article);
        return "admin/pages/article/article_update";
    }

    /**
     * 添加文章
     * @return String
     */
    @PostMapping("/article/add")
    @ResponseBody
    public ResponseBean add(@RequestBody @Valid Article article) {
        article.setContent(HtmlUtil.escape(article.getContent()));
        article.setUserId(getUser().getId());
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
    public ResponseBean update(@RequestBody @Valid Article article) {
        article.setContent(HtmlUtil.escape(article.getContent()));
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
    @PostMapping("/article/list")
    @ResponseBody
    public Pager<Article> list(@RequestBody Pager<Article> pager) {
        return articleService.list(pager);
    }


    /**
     * 更改置顶状态
     * @return String
     */
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
