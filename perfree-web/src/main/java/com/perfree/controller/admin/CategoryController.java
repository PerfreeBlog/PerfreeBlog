package com.perfree.controller.admin;

import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Category;
import com.perfree.service.CategoryService;
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
public class CategoryController extends BaseController  {
    private final Logger logger = LoggerFactory.getLogger(CategoryController.class);
    @Autowired
    private CategoryService categoryService;

    /**
     * 分类管理列表页
     * @return String
     */
    @RequestMapping("/category")
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    public String index() {
        return view("static/admin/pages/category/category_list.html");
    }

    /**
     * 分类添加页
     * @return String
     */
    @RequestMapping("/category/addPage/{pid}")
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    public String addPage(@PathVariable("pid") String pid, Model model) {
        model.addAttribute("pid", pid);
        return view("static/admin/pages/category/category_add.html");
    }

    /**
     * 添加分类
     * @return String
     */
    @PostMapping("/category/add")
    @ResponseBody
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    public ResponseBean add(@RequestBody @Valid Category category) {
        if (categoryService.add(category) > 0) {
            return ResponseBean.success("添加成功", null);
        }
        logger.error("分类添加失败: {}",category.toString());
        return ResponseBean.fail("添加失败", null);
    }


    /**
     * 分类管理列表数据
     * @return String
     */
    @PostMapping("/category/list")
    @ResponseBody
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    public Pager<Category> list(@RequestBody Pager<Category> pager) {
        return categoryService.list(pager);
    }

    /**
     * 获取所有分类
     * @return String
     */
    @GetMapping("/category/allList")
    @ResponseBody
    @RequiresRoles(value={"admin","editor", "contribute"}, logical= Logical.OR)
    public ResponseBean allList() {
        return ResponseBean.success("获取成功", categoryService.allList());
    }

    /**
     * 分类编辑页
     * @return String
     */
    @RequestMapping("/category/editPage/{id}")
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    public String editPage(@PathVariable("id") String id, Model model) {
        model.addAttribute("category", categoryService.getById(id));
        return view("static/admin/pages/category/category_edit.html");
    }

    /**
     * 删除分类
     * @return String
     */
    @PostMapping("/category/del")
    @ResponseBody
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    public ResponseBean del(@RequestBody String ids) {
        String[] idArr = ids.split(",");
        if (categoryService.del(idArr) > 0) {
            return ResponseBean.success("删除成功", null);
        }
        logger.error("分类删除失败: {}",ids);
        return ResponseBean.fail("删除失败", null);
    }

    /**
     * 更新分类
     * @return String
     */
    @PostMapping("/category/update")
    @ResponseBody
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    public ResponseBean update(@RequestBody @Valid Category category) {
        if (categoryService.update(category) > 0) {
            return ResponseBean.success("更新成功", null);
        }
        logger.error("分类更新失败: {}", category.toString());
        return ResponseBean.fail("更新失败", null);
    }

    /**
     * 更改状态
     * @return String
     */
    @PostMapping("/category/changeStatus")
    @ResponseBody
    @RequiresRoles(value={"admin","editor"}, logical= Logical.OR)
    public ResponseBean changeStatus(@RequestBody Category category) {
        if (categoryService.changeStatus(category) > 0) {
            return ResponseBean.success("修改成功", null);
        }
        logger.error("分类修改失败: {}", category.toString());
        return ResponseBean.fail("修改失败", null);
    }
}
