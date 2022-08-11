package com.perfree.controller.admin;

import com.perfree.commons.Constants;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseController;
import com.perfree.model.Category;
import com.perfree.model.Tag;
import com.perfree.permission.AdminMenu;
import com.perfree.service.CategoryService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    @AdminMenu(name = "分类管理", seq = 5, groupId = Constants.ADMIN_MENU_GROUP_CONTENT,
            role = {Constants.ROLE_ADMIN, Constants.ROLE_EDITOR})
    public String index() {
        return view("static/admin/pages/category/category_list.html");
    }

    /**
     * 添加分类
     * @return String
     */
    @PostMapping("/category/add")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public ResponseBean add(@RequestBody @Valid Category category) {
        Category categoryBySlug = categoryService.getBySlug(category.getSlug());
        if (categoryBySlug != null){
            return ResponseBean.fail("访问地址别名重复!", null);
        }
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
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public Pager<Category> list(@RequestBody Pager<Category> pager) {
        return categoryService.list(pager);
    }

    /**
     * 获取所有分类
     * @return String
     */
    @GetMapping("/category/allList")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public ResponseBean allList() {
        return ResponseBean.success("获取成功", categoryService.allList(new Category()));
    }

    /**
     * 删除分类
     * @return String
     */
    @PostMapping("/category/del")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
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
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public ResponseBean update(@RequestBody @Valid Category category) {
        if (category.getPid().equals(category.getId())) {
            return ResponseBean.fail("不可将当前分类设置为父级分类", null);
        }
        if (StringUtils.isBlank(category.getSlug())) {
            return ResponseBean.fail("访问地址别名不能为空", null);
        }
        Category categoryBySlug = categoryService.getBySlug(category.getSlug());
        if (categoryBySlug != null && !categoryBySlug.getId().equals(category.getId())){
            return ResponseBean.fail("访问地址别名重复", null);
        }
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
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public ResponseBean changeStatus(@RequestBody Category category) {
        if (categoryService.changeStatus(category) > 0) {
            return ResponseBean.success("修改成功", null);
        }
        logger.error("分类修改失败: {}", category.toString());
        return ResponseBean.fail("修改失败", null);
    }

    @GetMapping("/category/getById")
    @ResponseBody
    public ResponseBean getById(@ApiParam(name="categoryId",value="分类ID",required=true) @RequestParam("categoryId") String categoryId) {
        Category category = categoryService.getById(categoryId);
        return ResponseBean.success("success", category);
    }
}
