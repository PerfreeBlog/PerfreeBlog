package com.perfree.controller.auth.link;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.link.vo.LinkAddReqVO;
import com.perfree.controller.auth.link.vo.LinkPageReqVO;
import com.perfree.controller.auth.link.vo.LinkRespVO;
import com.perfree.controller.auth.link.vo.LinkUpdateReqVO;
import com.perfree.convert.link.LinkConvert;
import com.perfree.model.Link;
import com.perfree.service.link.LinkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "友链相关接口")
@RequestMapping("api/auth/link")
public class LinkController {

    @Resource
    private LinkService linkService;


    @PostMapping("/page")
    @Operation(summary = "友链分页列表")
    public CommonResult<PageResult<LinkRespVO>> page(@RequestBody LinkPageReqVO pageVO) {
        PageResult<LinkRespVO> linkPageResult = linkService.linkPage(pageVO);
        return success(linkPageResult);
    }

    @PostMapping("/add")
    @Operation(summary = "添加友链")
    @PreAuthorize("@ss.hasPermission('admin:link:create')")
    public CommonResult<LinkRespVO> add(@RequestBody @Valid LinkAddReqVO linkAddReqVO) {
        Link link = linkService.addLink(linkAddReqVO);
        return success(LinkConvert.INSTANCE.convertRespVO(link));
    }

    @PutMapping("/update")
    @Operation(summary = "更新友链")
    @PreAuthorize("@ss.hasPermission('admin:link:update')")
    public CommonResult<LinkRespVO> update(@RequestBody @Valid LinkUpdateReqVO linkUpdateReqVO) {
        Link link = linkService.updateLink(linkUpdateReqVO);
        return success(LinkConvert.INSTANCE.convertRespVO(link));
    }

    @GetMapping("/get")
    @Operation(summary = "获取友链")
    public CommonResult<LinkRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(linkService.getLinkById(id));
    }

    @DeleteMapping("/del")
    @Operation(summary = "删除友链")
    @PreAuthorize("@ss.hasPermission('admin:link:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(linkService.del(id));
    }

}
