package com.perfree.controller.api;

import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseApiController;
import com.perfree.model.Category;
import com.perfree.service.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Api(value = "分类相关",tags = "分类模块")
@RequestMapping("/api/category")
public class CategoryController extends BaseApiController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getById")
    @ApiOperation(value = "根据分类ID获取分类信息", notes = "根据分类ID获取分类信息")
    public ResponseBean getById(@ApiParam(name="categoryId",value="分类ID",required=true) @RequestParam("categoryId") String categoryId) {
        Category category = categoryService.getById(categoryId);
        return ResponseBean.success("success", category);
    }

    @GetMapping("/getList")
    @ApiOperation(value = "获取分类列表", notes = "获取分类列表")
    public ResponseBean getList() {
        List<Category> categories = categoryService.getApiList();
        return ResponseBean.success("success", categories);
    }
}
