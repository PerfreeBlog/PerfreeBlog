package com.perfree.controller.api.site;

import com.perfree.base.BaseApiController;
import com.perfree.commons.CommonResult;
import com.perfree.commons.PageResult;
import com.perfree.controller.api.site.vo.*;
import com.perfree.convert.SiteConvert;
import com.perfree.model.Site;
import com.perfree.service.site.SiteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Tag(name = "多站点相关")
@RequestMapping("/api/site")
public class SiteController extends BaseApiController {

    @Resource
    private SiteService siteService;

    @PostMapping("/page")
    @Operation(summary = "多站点分页列表")
    public CommonResult<PageResult<SiteRespVO>> page(@RequestBody SitePageReqVO pageVO) {
        PageResult<Site> sitePageResult = siteService.sitePage(pageVO);
        return CommonResult.success(SiteConvert.INSTANCE.convertPageResultVO(sitePageResult));
    }

    @GetMapping("/get")
    @Operation(summary = "获取站点信息")
    public CommonResult<SiteRespVO> get(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(SiteConvert.INSTANCE.convertRespVO(siteService.getById(id)));
    }

    @GetMapping("/list")
    @Operation(summary = "获取所有站点")
    public CommonResult<List<SiteRespVO>> list() {
        return CommonResult.success(siteService.getList());
    }

    @PostMapping("/add")
    @Operation(summary = "添加站点")
    public CommonResult<SiteRespVO> add(@RequestBody @Valid SiteAddReqVO siteAddReqVO) {
        return CommonResult.success(SiteConvert.INSTANCE.convertRespVO(siteService.addSite(siteAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新站点")
    public CommonResult<SiteRespVO> update(@RequestBody @Valid SiteUpdateReqVO siteUpdateReqVO) {
        return CommonResult.success(SiteConvert.INSTANCE.convertRespVO(siteService.updateSite(siteUpdateReqVO)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "删除站点")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(siteService.del(id));
    }

    @DeleteMapping("/batchDel")
    @Operation(summary = "删除站点")
    public CommonResult<Boolean> batchDel(@RequestParam(value = "ids") String ids) {
        return CommonResult.success(siteService.batchDel(ids));
    }

    @PutMapping("/updateStatus")
    @Operation(summary = "更新站点状态")
    public CommonResult<Boolean> updateStatus(@RequestBody @Valid SiteUpdateStatusReqVO siteUpdateStatusReqVO) {
        return CommonResult.success(siteService.updateStatus(siteUpdateStatusReqVO));
    }
}
