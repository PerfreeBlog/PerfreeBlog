package com.perfree.controller.common.category;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.category.vo.CategoryListReqVO;
import com.perfree.controller.auth.category.vo.CategoryPageReqVO;
import com.perfree.controller.auth.category.vo.CategoryRespVO;
import com.perfree.controller.auth.category.vo.CategoryTreeRespVO;
import com.perfree.service.category.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "分类相关接口")
@RequestMapping("api/category")
public class CategoryController {

    @Resource
    private CategoryService categoryService;

    @PostMapping("/page")
    @Operation(summary = "分类分页列表")
    public CommonResult< PageResult<CategoryRespVO>> page(@RequestBody CategoryPageReqVO pageVO) {
        return success(categoryService.categoryPage(pageVO));
    }

    @PostMapping("/listTree")
    @Operation(summary = "分类树形结构列表")
    public CommonResult<List<CategoryTreeRespVO>> listTree(@RequestBody CategoryListReqVO reqVO) {
        return success(categoryService.listTree(reqVO));
    }

    @GetMapping("/get")
    @Operation(summary = "获取分类")
    public CommonResult<CategoryRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(categoryService.getCategoryById(id));
    }

    @GetMapping("/getBySlug")
    @Operation(summary = "根据slug获取分类")
    public CommonResult<CategoryRespVO> getBySlug(@RequestParam(value = "slug") String slug) {
        return success(categoryService.getBySlug(slug));
    }

    @GetMapping("/getHotCategory")
    @Operation(summary = "获取热门分类")
    public CommonResult<List<CategoryRespVO>> getHotCategory(@RequestParam(value = "num") Integer num) {
        return success(categoryService.getHotCategory(num));
    }
}
