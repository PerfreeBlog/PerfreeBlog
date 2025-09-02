package com.perfree.controller.auth.category;


import cn.dev33.satoken.annotation.SaCheckPermission;
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
import org.noear.solon.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "分类相关接口")
@Mapping("api/auth/category")
public class CategoryController {

    @Inject
    private CategoryService categoryService;

    @Post
    @Mapping("/pageList")
    @Operation(summary = "分类页面列表")
    public CommonResult<List<CategoryRespVO>> pageList(@Body CategoryListReqVO reqVO) {
        return success(categoryService.categoryPageList(reqVO));
    }

    @Post
    @Mapping("/listTree")
    @Operation(summary = "分类树形结构列表")
    public CommonResult<List<CategoryTreeRespVO>> listTree(@Body CategoryListReqVO reqVO) {
        return success(categoryService.listTree(reqVO));
    }

    @Post
    @Mapping("/add")    
    @Operation(summary = "添加分类")
    @SaCheckPermission("admin:category:create")
    public CommonResult<CategoryRespVO> add(@Body @Valid CategoryAddReqVO categoryAddReqVO) {
        Category category = categoryService.addCategory(categoryAddReqVO);
        return success(CategoryConvert.INSTANCE.convertRespVO(category));
    }

    @Put
    @Mapping("/update")
    @Operation(summary = "更新分类")
    @SaCheckPermission("admin:category:update")
    public CommonResult<CategoryRespVO> update(@Body @Valid CategoryUpdateReqVO categoryUpdateReqVO) {
        Category category = categoryService.updateCategory(categoryUpdateReqVO);
        return success(CategoryConvert.INSTANCE.convertRespVO(category));
    }

    @Post
    @Mapping("/get")
    @Operation(summary = "获取分类")
    public CommonResult<CategoryRespVO> get(@Param(value = "id") Integer id) {
        return success(categoryService.getCategoryById(id));
    }

    @Post
    @Mapping("/del")
    @Operation(summary = "删除分类")
    @SaCheckPermission("admin:category:delete")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return success(categoryService.del(id));
    }
}
