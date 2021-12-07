package com.perfree.controller.api.pub;

import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseApiController;
import com.perfree.model.Category;
import com.perfree.model.Tag;
import com.perfree.service.TagService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@CrossOrigin
@Api(value = "标签相关",tags = "标签相关")
@RequestMapping("/api/tag")
public class TagController extends BaseApiController {

    @Autowired
    private TagService tagService;

    @GetMapping("/getById")
    @ApiOperation(value = "根据标签ID获取标签信息", notes = "根据标签ID获取标签信息")
    public ResponseBean getById(@ApiParam(name="tagId",value="标签ID",required=true) @RequestParam("tagId") String tagId) {
        Tag tag = tagService.getById(tagId);
        return ResponseBean.success("success", tag);
    }


    @GetMapping("/getAllList")
    @ApiOperation(value = "获取所有标签", notes = "获取所有标签")
    public ResponseBean getAllList() {
        List<Tag> tags = tagService.allList();
        return ResponseBean.success("success", tags);
    }

    @GetMapping("/getList")
    @ApiOperation(value = "标签分页数据", notes = "标签分页数据,可根据标签名模糊查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "name", value = "标签名", dataTypeClass = String.class, paramType = "query"),
    })
    public Pager<Tag> getList(@ApiIgnore Pager<Tag> pager, @ApiIgnore String name) {
        pager.setForm(new Tag());
        pager.getForm().setName(name);
        return tagService.list(pager);
    }
}
