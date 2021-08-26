package com.perfree.controller.api;

import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseApiController;
import com.perfree.model.Tag;
import com.perfree.service.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Api(value = "标签相关",tags = "标签模块")
@RequestMapping("/api/tag")
public class TagController extends BaseApiController {

    @Autowired
    private TagService tagService;

    @PostMapping("/getById")
    @ApiOperation(value = "根据标签ID获取标签信息", notes = "根据标签ID获取标签信息")
    public ResponseBean getById(@ApiParam(name="tagId",value="标签ID",required=true) @RequestBody String tagId) {
        Tag tag = tagService.getById(tagId);
        return ResponseBean.success("success", tag);
    }


    @GetMapping("/getList")
    @ApiOperation(value = "获取标签列表", notes = "获取标签列表")
    public ResponseBean getList() {
        List<Tag> tags = tagService.allList();
        return ResponseBean.success("success", tags);
    }
}
