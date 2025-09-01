package com.perfree.controller.common.dictData;


import com.perfree.cache.DictDataCacheService;
import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.dictData.vo.DictDataRespVO;
import com.perfree.convert.dictData.DictDataConvert;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.Controller;
import org.noear.solon.annotation.Get;
import org.noear.solon.annotation.Inject;
import org.noear.solon.annotation.Mapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
* @description 数据字典值 controller
* @author Perfree
**/
@Controller
@Tag(name = "数据字典值相关接口")
@Mapping("api/dictData")
public class DictDataController {

    @Inject
    private DictDataCacheService dictDataCacheService;

    @Get
    @Mapping("/listAllCache")
    @Operation(summary = "获取所有数据字典值(缓存)")
    public CommonResult<List<DictDataRespVO>> listAllCache() {
        return success(DictDataConvert.INSTANCE.convertDTOListToRespVOList(dictDataCacheService.getAllDictData()));
    }

}