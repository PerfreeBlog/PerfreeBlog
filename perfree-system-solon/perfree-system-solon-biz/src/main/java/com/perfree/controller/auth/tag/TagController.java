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
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "标签相关接口")
@Mapping("api/auth/tag")
public class TagController {

    @Inject
    private TagService tagService;

    @Post
    @Mapping("/page")
    @Operation(summary = "标签分页列表")
    public CommonResult<PageResult<TagRespVO>> page(@Body TagPageReqVO pageVO) {
        PageResult<TagRespVO> tagPageResult = tagService.tagPage(pageVO);
        return success(tagPageResult);
    }

    @Get
    @Mapping("/getAllTag")
    @Operation(summary = "获取所有标签列表")
    public CommonResult<List<TagRespVO>> getAllTag() {
        List<com.perfree.model.Tag> list = tagService.list();
        return success(TagConvert.INSTANCE.convertRespVOList(list));
    }

    @Post
    @Mapping("/add")
    @Operation(summary = "新增标签")
    @PreAuthorize("@ss.hasPermission('admin:tag:create')")
    public CommonResult<TagRespVO> add(@Body @Valid TagCreateReqVO tagCreateReqVO) {
        com.perfree.model.Tag tag = tagService.add(tagCreateReqVO);
        return CommonResult.success(TagConvert.INSTANCE.convertRespVO(tag));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "获取标签信息")
    public CommonResult<TagRespVO> add(@Param(value = "id") Integer id) {
        return CommonResult.success(tagService.getTagById(id));
    }

    @Put
    @Mapping("/update")
    @Operation(summary = "修改标签")
    @PreAuthorize("@ss.hasPermission('admin:tag:update')")
    public CommonResult<Boolean> update(@Body @Valid TagUpdateReqVO tagUpdateReqVO) {
        return CommonResult.success(tagService.updateTag(tagUpdateReqVO));
    }


    @Delete
    @Mapping("/del")
    @Operation(summary = "根据id删除标签")
    @PreAuthorize("@ss.hasPermission('admin:tag:delete')")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return CommonResult.success(tagService.del(id));
    }
}
