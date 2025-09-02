package com.perfree.controller.auth.extra;


import cn.dev33.satoken.annotation.SaCheckPermission;
import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.extra.vo.ExtraAddReqVO;
import com.perfree.controller.auth.extra.vo.ExtraPageReqVO;
import com.perfree.controller.auth.extra.vo.ExtraRespVO;
import com.perfree.controller.auth.extra.vo.ExtraUpdateReqVO;
import com.perfree.convert.extra.ExtraConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.Extra;
import com.perfree.service.extra.ExtraService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.noear.solon.annotation.Mapping;

import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "附加数据相关接口")
@Mapping("api/auth/extra")
public class ExtraController extends BaseController {

    @Inject
    private ExtraService extraService;


    @Get
    @Mapping("/getByKey")
    @Operation(summary = "根据key获取附加数据")
    public CommonResult<ExtraRespVO> getByKey(@Param(value = "extraKey") String extraKey) {
        return success(ExtraConvert.INSTANCE.convertRespVO(extraService.getByKey(extraKey)));
    }

    @Post
    @Mapping("/page")
    @Operation(summary = "附加数据分页列表")
    @SaCheckPermission("admin:extra:query")
    public CommonResult<PageResult<ExtraRespVO>> page(@Body ExtraPageReqVO pageVO) {
        startPage(pageVO);
        List<Extra> extraList = extraService.extraPage(pageVO);
        return pageSuccess(ExtraConvert.INSTANCE.convertListRespVO(extraList));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "获取附加数据")
    public CommonResult<ExtraRespVO> get(@Param(value = "id") Integer id) {
        return success(ExtraConvert.INSTANCE.convertRespVO(extraService.get(id)));
    }

    @Post
    @Mapping("/add")
    @Operation(summary = "添加附加数据")
    @DemoMode
    @SaCheckPermission("admin:extra:create")
    public CommonResult<ExtraRespVO> add(@Body @Valid ExtraAddReqVO extraAddReqVO) {
        return success(ExtraConvert.INSTANCE.convertRespVO(extraService.add(extraAddReqVO)));
    }

    @Post
    @Mapping("/update")
    @Operation(summary = "更新附加数据")
    @DemoMode
    @SaCheckPermission("admin:extra:update")
    public CommonResult<ExtraRespVO> update(@Body @Valid ExtraUpdateReqVO extraUpdateReqVO) {
        return success(ExtraConvert.INSTANCE.convertRespVO(extraService.updateExtra(extraUpdateReqVO)));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "删除附加数据")
    @DemoMode
    @SaCheckPermission("admin:extra:delete")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return success(extraService.del(id));
    }
}
