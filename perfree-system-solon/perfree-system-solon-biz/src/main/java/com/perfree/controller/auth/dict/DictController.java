package com.perfree.controller.auth.dict;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.dict.vo.*;
import com.perfree.convert.dict.DictConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.Dict;
import com.perfree.service.dict.DictService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
* @description 数据字典 controller
* @author Perfree
**/
@Controller
@Tag(name = "数据字典相关接口")
@Mapping("api/auth/dict")
public class DictController {

    @Inject
    private DictService dictService;

    @Post
    @Mapping("/page")
    @Operation(summary = "数据字典分页列表")
    @PreAuthorize("@ss.hasPermission('admin:dict:query')")
    public CommonResult<PageResult<DictRespVO>> page(@Body DictPageReqVO pageVO) {
        PageResult<Dict> dictPageResult = dictService.dictPage(pageVO);
        return success(DictConvert.INSTANCE.convertPageResultVO(dictPageResult));
    }

    @Post
    @Mapping("/add")
    @Operation(summary = "添加数据字典")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:dict:create')")
    public CommonResult<DictRespVO> add(@Body @Valid DictAddReqVO dictAddReqVO) {
        return success(DictConvert.INSTANCE.convertRespVO(dictService.add(dictAddReqVO)));
    }

    @Post
    @Mapping("/update") 
    @Operation(summary = "更新数据字典")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:dict:update')")
    public CommonResult<DictRespVO> update(@Body @Valid DictUpdateReqVO dictUpdateReqVO) {
        return success(DictConvert.INSTANCE.convertRespVO(dictService.update(dictUpdateReqVO)));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取数据字典")
    public CommonResult<DictRespVO> get(@Param(value = "id") Integer id) {
        return success(DictConvert.INSTANCE.convertRespVO(dictService.get(id)));
    }

    @Delete
    @Mapping("/del")
    @DemoMode
    @Operation(summary = "根据id删除数据字典")
    @PreAuthorize("@ss.hasPermission('admin:dict:delete')")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return success(dictService.del(id));
    }

    @Get
    @Mapping("/listAll")
    @Operation(summary = "获取所有数据字典")
    public CommonResult<List<DictRespVO>> listAll() {
        return success(DictConvert.INSTANCE.convertListRespVO(dictService.listAll()));
    }

    @Get
    @Mapping("/queryListAll")
    @Operation(summary = "根据条件获取所有数据字典")
    public CommonResult<List<DictRespVO>> queryListAll(@Param(value = "dictType") String dictType, @Param(value = "dictName") String dictName) {
        return success(DictConvert.INSTANCE.convertListRespVO(dictService.queryListAll(dictType, dictName)));
    }
}