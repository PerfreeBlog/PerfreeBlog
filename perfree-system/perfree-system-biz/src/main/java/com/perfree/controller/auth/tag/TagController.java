package com.perfree.controller.auth.tag;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.tag.vo.TagCreateReqVO;
import com.perfree.controller.auth.tag.vo.TagPageReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.controller.auth.tag.vo.TagUpdateReqVO;
import com.perfree.convert.tag.TagConvert;
import com.perfree.service.tag.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "标签相关接口")
@RequestMapping("api/auth/tag")
public class TagController {

    private final static Logger LOGGER = LoggerFactory.getLogger(TagController.class);

    @Resource
    private TagService tagService;

    @PostMapping("/page")
    @Operation(summary = "标签分页列表")
    public CommonResult<PageResult<TagRespVO>> page(@RequestBody TagPageReqVO pageVO) {
        PageResult<com.perfree.model.Tag> tagPageResult = tagService.tagPage(pageVO);
        return success(TagConvert.INSTANCE.convertPageResultVO(tagPageResult));
    }

    @PostMapping("/add")
    @Operation(summary = "新增标签")
    public CommonResult<TagRespVO> add(@RequestBody @Valid TagCreateReqVO tagCreateReqVO) {
        com.perfree.model.Tag tag = tagService.add(tagCreateReqVO);
        return CommonResult.success(TagConvert.INSTANCE.convertRespVO(tag));
    }

    @GetMapping("/get")
    @Operation(summary = "获取标签信息")
    public CommonResult<TagRespVO> add(Integer id) {
        com.perfree.model.Tag tag = tagService.getById(id);
        return CommonResult.success(TagConvert.INSTANCE.convertRespVO(tag));
    }

    @PutMapping("/update")
    @Operation(summary = "修改标签")
    public CommonResult<Boolean> update(@RequestBody @Valid TagUpdateReqVO tagUpdateReqVO) {
        return CommonResult.success(tagService.updateTag(tagUpdateReqVO));
    }


    @DeleteMapping("/del")
    @Operation(summary = "根据id删除标签")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(tagService.del(id));
    }
}
