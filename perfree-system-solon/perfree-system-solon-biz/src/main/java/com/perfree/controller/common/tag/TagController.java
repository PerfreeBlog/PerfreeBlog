package com.perfree.controller.common.tag;

import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.tag.vo.TagPageReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.convert.tag.TagConvert;
import com.perfree.service.tag.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "标签相关接口")
@Mapping("api/tag")
public class TagController extends BaseController {

    @Inject
    private TagService tagService;

    @Post
    @Mapping("/page")
    @Operation(summary = "标签分页列表")
    public CommonResult<PageResult<TagRespVO>> page(@Body TagPageReqVO pageVO) {
        startPage(pageVO);
        List<TagRespVO> tagPageResult = tagService.tagPage(pageVO);
        return pageSuccess(tagPageResult);
    }

    @Get
    @Mapping("/getAllTag")
    @Operation(summary = "获取所有标签")
    public CommonResult<List<TagRespVO>> getAllTag() {
        List<com.perfree.model.Tag> list = tagService.list();
        return success(TagConvert.INSTANCE.convertRespVOList(list));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "获取标签信息")
    public CommonResult<TagRespVO> add(@Param(value = "id") Integer id) {
        return CommonResult.success(tagService.getTagById(id));
    }

    @Get
    @Mapping("/getBySlug")
    @Operation(summary = "根据slug获取标签信息")
    public CommonResult<TagRespVO> getBySlug(@Param(value = "slug") String slug) {
        return CommonResult.success(tagService.getBySlug(slug));
    }

    @Get
    @Mapping("/getHotTag")
    @Operation(summary = "获取热门标签")
    public CommonResult<List<TagRespVO>> getHotTag(@Param(value = "num") Integer num) {
        return CommonResult.success(tagService.getHotTag(num));
    }
}
