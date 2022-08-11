package com.perfree.controller.admin;

import cn.hutool.core.date.DateUtil;
import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Article;
import com.perfree.permission.AdminMenu;
import com.perfree.service.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

/**
 * 动态
 */
@Controller
@RequestMapping("/admin")
public class JournalController  extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(ArticleController.class);
    @Autowired
    private ArticleService articleService;

    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    @RequestMapping("/journal/addPage")
    public String addPage() {
        return view("static/admin/pages/journal/journal_create.html");
    }

    /**
     * 添加文章
     * @return String
     */
    @PostMapping("/journal/add")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public ResponseBean add(@RequestBody Article article) {
        article.setUserId(getUser().getId());
        article.setTitle(DateUtil.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
        if (StringUtils.isBlank(article.getContent())) {
            return ResponseBean.fail("内容不允许为空", null);
        }
        if (articleService.add(article) > 0) {
            return ResponseBean.success("添加成功", article);
        }
        logger.error("动态添加失败: {}", article.toString());
        return ResponseBean.fail("添加失败", null);
    }

    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    @RequestMapping("/journal")
    @AdminMenu(name = "动态管理", seq = 2, groupId = Constants.ADMIN_MENU_GROUP_CONTENT,
            role = {Constants.ROLE_ADMIN, Constants.ROLE_EDITOR})
    public String index(Model model) {
        return view("static/admin/pages/journal/journal_list.html");
    }

    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    @RequestMapping("/journal/updatePage/{id}")
    public String updatePage(@PathVariable("id") String id, Model model) {
        Article article = articleService.getById(id);
        model.addAttribute("article", article);
        return view("/static/admin/pages/journal/journal_update.html");
    }

    /**
     * 更新文章
     * @return String
     */
    @PostMapping("/journal/update")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public ResponseBean update(@RequestBody Article article) {
        if (StringUtils.isBlank(article.getContent())) {
            return ResponseBean.fail("内容不允许为空", null);
        }
        if (articleService.update(article) > 0) {
            return ResponseBean.success("更新成功", article);
        }
        logger.error("动态更新失败: {}", article.toString());
        return ResponseBean.fail("更新失败", null);
    }
}
