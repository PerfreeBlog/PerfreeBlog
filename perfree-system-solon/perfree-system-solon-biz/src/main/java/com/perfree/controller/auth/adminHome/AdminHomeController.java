package com.perfree.controller.auth.adminHome;

import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.adminHome.vo.HomeStatisticRespVO;
import com.perfree.controller.auth.adminHome.vo.ServerInfoRespVO;
import com.perfree.service.adminHome.AdminHomeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.noear.solon.annotation.Controller;
import org.noear.solon.annotation.Get;
import org.noear.solon.annotation.Inject;
import org.noear.solon.annotation.Mapping;

import static com.perfree.commons.common.CommonResult.success;


@Controller
@Tag(name = "首页相关接口")
@Mapping("api/auth/adminHome")
public class AdminHomeController {

    @Inject
    private AdminHomeService homeService;


    @Get
    @Mapping("/getServerInfo")
    @Operation(summary = "获取系统服务信息")
    public CommonResult<ServerInfoRespVO> getServerInfo() {
        return success(homeService.getServerInfo());
    }

    @Get
    @Mapping("/getHomeStatistic")
    @Operation(summary = "获取首页统计信息")
    public CommonResult<HomeStatisticRespVO> getHomeStatistic() {
        return success(homeService.getHomeStatistic());
    }

}
