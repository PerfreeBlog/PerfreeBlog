package com.perfree.controller.site;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.role.vo.RolePageReqVO;
import com.perfree.controller.role.vo.RoleRespVO;
import com.perfree.controller.site.vo.SitePageReqVO;
import com.perfree.controller.site.vo.SiteRespVO;
import com.perfree.convert.role.RoleConvert;
import com.perfree.convert.site.SiteConvert;
import com.perfree.model.Role;
import com.perfree.model.Site;
import com.perfree.service.site.SiteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
