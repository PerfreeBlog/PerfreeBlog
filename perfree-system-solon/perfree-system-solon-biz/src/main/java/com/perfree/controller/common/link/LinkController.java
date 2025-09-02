package com.perfree.controller.common.link;

import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.link.vo.LinkPageReqVO;
import com.perfree.controller.auth.link.vo.LinkRespVO;
import com.perfree.service.link.LinkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "友链相关接口")
@Mapping("api/link")
public class LinkController extends BaseController {

    @Inject
    private LinkService linkService;


    @Post
    @Mapping("/page")
    @Operation(summary = "友链分页列表")
    public CommonResult<PageResult<LinkRespVO>> page(@Body LinkPageReqVO pageVO) {
        SortingFieldUtils.handleDefaultSortingField(pageVO);
        startPage(pageVO);
        List<LinkRespVO> linkPageResult = linkService.linkPage(pageVO);
        return pageSuccess(linkPageResult);
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "获取友链")
    public CommonResult<LinkRespVO> get(@Param(value = "id") Integer id) {
        return success(linkService.getLinkById(id));
    }
}
