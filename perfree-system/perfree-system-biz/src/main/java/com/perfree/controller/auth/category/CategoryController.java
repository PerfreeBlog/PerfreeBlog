package com.perfree.controller.auth.category;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.category.vo.*;
import com.perfree.convert.category.CategoryConvert;
import com.perfree.model.Category;
import com.perfree.service.category.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "分类相关接口")
@RequestMapping("api/auth/category")
public class CategoryController {

    @Resource
    private CategoryService categoryService;

    @PostMapping("/pageList")
    @Operation(summary = "分类页面列表")
    public CommonResult<List<CategoryRespVO>> pageList(@RequestBody CategoryListReqVO reqVO) {
        return success(categoryService.categoryPageList(reqVO));
    }

    @PostMapping("/listTree")
    @Operation(summary = "分类树形结构列表")
    public CommonResult<List<CategoryTreeRespVO>> listTree(@RequestBody CategoryListReqVO reqVO) {
        return success(categoryService.listTree(reqVO));
    }

    @PostMapping("/add")
    @Operation(summary = "添加分类")
    @PreAuthorize("@ss.hasPermission('admin:category:create')")
    public CommonResult<CategoryRespVO> add(@RequestBody @Valid CategoryAddReqVO categoryAddReqVO) {
        Category category = categoryService.addCategory(categoryAddReqVO);
        return success(CategoryConvert.INSTANCE.convertRespVO(category));
    }

    @PutMapping("/update")
    @Operation(summary = "更新分类")
    @PreAuthorize("@ss.hasPermission('admin:category:update')")
    public CommonResult<CategoryRespVO> update(@RequestBody @Valid CategoryUpdateReqVO categoryUpdateReqVO) {
        Category category = categoryService.updateCategory(categoryUpdateReqVO);
        return success(CategoryConvert.INSTANCE.convertRespVO(category));
    }

    @GetMapping("/get")
    @Operation(summary = "获取分类")
    public CommonResult<CategoryRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(categoryService.getCategoryById(id));
    }

    @DeleteMapping("/del")
    @Operation(summary = "删除分类")
    @PreAuthorize("@ss.hasPermission('admin:category:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(categoryService.del(id));
    }
}
