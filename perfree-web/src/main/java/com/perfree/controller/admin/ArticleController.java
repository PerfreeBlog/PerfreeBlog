package com.perfree.controller.admin;

import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Article;
import com.perfree.model.Tag;
import com.perfree.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    /**
     * 添加文章
     * @return String
     */
    @PostMapping("/article/add")
    @ResponseBody
    public ResponseBean add(@RequestBody @Valid Article article) {
        article.setUserId(getUser().getId());
        if (articleService.add(article) > 0) {
            return ResponseBean.success("添加成功", article);
        }
        logger.error("文章添加失败: {}", article.toString());
        return ResponseBean.fail("添加失败", null);
    }
}
