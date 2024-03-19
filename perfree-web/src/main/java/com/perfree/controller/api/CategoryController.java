package com.perfree.controller.api;

import com.perfree.base.BaseApiController;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Category;
import com.perfree.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Tag(name = "分类相关")
@RequestMapping("/api/category")
public class CategoryController extends BaseApiController {

    @Resource
    private CategoryService categoryService;

    @GetMapping("/getById")
    @Operation(summary = "根据分类ID获取分类信息")
    public ResponseBean getById(@RequestParam("categoryId") String categoryId) {
        Category category = categoryService.getById(categoryId);
        return ResponseBean.success("success", category);
    }

    @GetMapping("/getAllList")
    @Operation(summary = "获取所有分类")
    public ResponseBean getAllList() {
        List<Category> categories = categoryService.getApiList();
        return ResponseBean.success("success", categories);
    }

    @GetMapping("/getList")
    @Operation(summary = "分类分页数据")
    public Pager<Category> getList(Pager<Category> pager, @RequestParam(required = false) String name) {
        pager.setForm(new Category());
        pager.getForm().setName(name);
        return categoryService.list(pager);
    }
}
