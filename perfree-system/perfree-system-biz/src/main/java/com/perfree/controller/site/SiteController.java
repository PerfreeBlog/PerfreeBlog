package com.perfree.controller.site;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.site.vo.SiteAddReqVO;
import com.perfree.controller.site.vo.SitePageReqVO;
import com.perfree.controller.site.vo.SiteRespVO;
import com.perfree.controller.site.vo.SiteUpdateReqVO;
import com.perfree.convert.site.SiteConvert;
import com.perfree.model.Site;
import com.perfree.service.site.SiteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "站点相关接口")
@RequestMapping("api/site")
public class SiteController {

    @Resource
    private SiteService siteService;

    @PostMapping("/page")
    @Operation(summary = "站点分页列表")
    public CommonResult<PageResult<SiteRespVO>> page(@RequestBody SitePageReqVO pageVO) {
        PageResult<Site> sitePageResult = siteService.sitePage(pageVO);
        return success(SiteConvert.INSTANCE.convertPageResultVO(sitePageResult));
    }

    @PostMapping("/add")
    @Operation(summary = "添加站点")
    public CommonResult<SiteRespVO> add(@RequestBody @Valid SiteAddReqVO siteAddReqVO) {
        return success(SiteConvert.INSTANCE.convertRespVO(siteService.addSite(siteAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新站点")
    public CommonResult<SiteRespVO> update(@RequestBody @Valid SiteUpdateReqVO siteUpdateReqVO) {
        return success(SiteConvert.INSTANCE.convertRespVO(siteService.updateSite(siteUpdateReqVO)));
    }

    @GetMapping("/get")
    @Operation(summary = "获取站点")
    public CommonResult<SiteRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(SiteConvert.INSTANCE.convertRespVO(siteService.getById(id)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "删除站点")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(siteService.del(id));
    }
}
