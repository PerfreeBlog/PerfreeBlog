package com.perfree.controller.common.tag;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.tag.vo.TagPageReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.convert.tag.TagConvert;
import com.perfree.service.tag.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "标签相关接口")
@RequestMapping("api/tag")
public class TagController {

    @Resource
    private TagService tagService;

    @PostMapping("/page")
    @Operation(summary = "标签分页列表")
    public CommonResult<PageResult<TagRespVO>> page(@RequestBody TagPageReqVO pageVO) {
        PageResult<TagRespVO> tagPageResult = tagService.tagPage(pageVO);
        return success(tagPageResult);
    }

    @GetMapping("/getAllTag")
    @Operation(summary = "获取所有标签")
    public CommonResult<List<TagRespVO>> getAllTag() {
        List<com.perfree.model.Tag> list = tagService.list();
        return success(TagConvert.INSTANCE.convertRespVOList(list));
    }

    @GetMapping("/get")
    @Operation(summary = "获取标签信息")
    public CommonResult<TagRespVO> add(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(tagService.getTagById(id));
    }

    @GetMapping("/getBySlug")
    @Operation(summary = "根据slug获取标签信息")
    public CommonResult<TagRespVO> getBySlug(@RequestParam(value = "slug") String slug) {
        return CommonResult.success(tagService.getBySlug(slug));
    }

    @GetMapping("/getHotTag")
    @Operation(summary = "获取热门标签")
    public CommonResult<List<TagRespVO>> getHotTag(@RequestParam(value = "num") Integer num) {
        return CommonResult.success(tagService.getHotTag(num));
    }
}
