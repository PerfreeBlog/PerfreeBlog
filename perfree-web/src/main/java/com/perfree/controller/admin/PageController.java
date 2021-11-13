package com.perfree.controller.admin;

import com.perfree.commons.Constants;
import com.perfree.commons.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Article;
import com.perfree.permission.AdminMenu;
import com.perfree.service.ArticleService;
import com.perfree.service.MenuService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/admin")
@Controller
@RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
public class PageController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(PageController.class);
    @Autowired
    private ArticleService articleService;

    @Autowired
    private MenuService menuService;

    @RequestMapping("/page")
    @AdminMenu(name = "页面管理", seq = 2, groupId = Constants.ADMIN_MENU_GROUP_CONTENT,
            role = {Constants.ROLE_ADMIN, Constants.ROLE_EDITOR})
    public String index() {
        return view("static/admin/pages/page/page_list.html");
    }


    @RequestMapping("/page/addPage")
    public String addPage() {
        return view("static/admin/pages/page/page_create.html");
    }

    @RequestMapping("/page/updatePage/{id}")
    public String updatePage(@PathVariable("id") String id, Model model) {
        Article article = articleService.getById(id);
        model.addAttribute("article", article);
        return view("/static/admin/pages/page/page_update.html");
    }

    /**
     * 添加页面
     * @return String
     */
    @PostMapping("/page/add")
    @ResponseBody
    public ResponseBean add(@RequestBody @Valid Article article) {
        article.setUserId(getUser().getId());
        if (articleService.add(article) > 0) {
            return ResponseBean.success("添加成功", article);
        }
        logger.error("页面添加失败: {}", article.toString());
        return ResponseBean.fail("添加失败", null);
    }

    /**
     * 更新页面
     * @return String
     */
    @PostMapping("/page/update")
    @ResponseBody
    public ResponseBean update(@RequestBody @Valid Article article) {
        if (articleService.update(article) > 0) {
            return ResponseBean.success("更新成功", article);
        }
        logger.error("页面更新失败: {}", article.toString());
        return ResponseBean.fail("更新失败", null);
    }

    /**
     * 删除页面
     * @param ids ids
     * @return ResponseBean
     */
    @PostMapping("/page/del")
    @ResponseBody
    public ResponseBean del(@RequestBody String ids) {
        String[] idArr = ids.split(",");
        if (articleService.del(idArr) > 0) {
            // 将关联的菜单中的文章id置为空
            menuService.delMenuArticleId(idArr);
            return ResponseBean.success("删除成功", null);
        }
        logger.error("页面删除失败: {}", ids);
        return ResponseBean.fail("删除失败", null);
    }

    /**
     * 获取所有页面
     * @return Pager<Article>
     */
    @GetMapping("/page/getPageList")
    @ResponseBody
    public ResponseBean getPageList() {
        List<Article> articles = articleService.getPageList();
        return ResponseBean.success("获取成功", articles);
    }

}
