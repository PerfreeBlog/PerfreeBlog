package com.perfree.controller.api;

import com.perfree.base.BaseApiController;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Tag;
import com.perfree.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@io.swagger.v3.oas.annotations.tags.Tag(name = "标签相关")
@RequestMapping("/api/tag")
public class TagController extends BaseApiController {

    @Autowired
    private TagService tagService;

    @GetMapping("/getById")
    @Operation(summary = "根据标签ID获取标签信息")
    public ResponseBean getById(@RequestParam("tagId") String tagId) {
        Tag tag = tagService.getById(tagId);
        return ResponseBean.success("success", tag);
    }


    @GetMapping("/getAllList")
    @Operation(summary = "获取所有标签")
    public ResponseBean getAllList() {
        List<Tag> tags = tagService.allList();
        return ResponseBean.success("success", tags);
    }

    @GetMapping("/getList")
    @Operation(summary = "标签分页数据")
    public Pager<Tag> getList(Pager<Tag> pager, @RequestParam(required = false) String name) {
        pager.setForm(new Tag());
        pager.getForm().setName(name);
        return tagService.list(pager);
    }
}
