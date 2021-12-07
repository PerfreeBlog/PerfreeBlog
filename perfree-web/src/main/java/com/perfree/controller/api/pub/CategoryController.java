package com.perfree.controller.api.pub;

import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseApiController;
import com.perfree.model.Article;
import com.perfree.model.Category;
import com.perfree.service.CategoryService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@CrossOrigin
@Api(value = "分类相关",tags = "分类相关")
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

    @GetMapping("/getAllList")
    @ApiOperation(value = "获取所有分类", notes = "获取所有分类")
    public ResponseBean getAllList() {
        List<Category> categories = categoryService.getApiList();
        return ResponseBean.success("success", categories);
    }

    @GetMapping("/getList")
    @ApiOperation(value = "分类分页数据", notes = "分类分页,可根据分类名模糊查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "name", value = "分类名", dataTypeClass = String.class, paramType = "query"),
    })
    public Pager<Category> getList(@ApiIgnore Pager<Category> pager, @ApiIgnore String name) {
        pager.setForm(new Category());
        pager.getForm().setName(name);
        return categoryService.list(pager);
    }
}
