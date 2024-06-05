package com.perfree.controller.auth.codegen;


import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.codegen.vo.CodegenCreateListReqVO;
import com.perfree.controller.auth.codegen.vo.CodegenTableListReqVO;
import com.perfree.controller.auth.codegen.vo.CodegenTablePageReqVO;
import com.perfree.controller.auth.codegen.vo.CodegenTableRespVO;
import com.perfree.convert.codegen.CodegenConvert;
import com.perfree.model.CodegenTable;
import com.perfree.service.codegen.CodegenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
 * @description 代码生成
 * @author Perfree
 * @version 1.0.0
 * @create 2023/1/15 10:16
 **/
@RestController
@Tag(name = "代码生成相关接口")
@RequestMapping("api/auth/codegen")
public class CodegenController {

    @Resource
    private CodegenService codegenService;

    @PostMapping("/getTableList")
    @Operation(summary = "获取数据库所有的表")
    public CommonResult<List<TableInfo>> getTableList(@RequestBody CodegenTableListReqVO codegenTableListReqVO) {
        return success(codegenService.getTableList(codegenTableListReqVO));
    }

    @Operation(summary = "基于数据库的表结构，创建代码生成器的表和字段定义")
    @PostMapping("/create-list")
    public CommonResult<String> createCodegenList(@Valid @RequestBody CodegenCreateListReqVO reqVO) {
        codegenService.createCodegenList(reqVO);
        return success("操作成功");
    }

    @PostMapping("/codegenTablePage")
    @Operation(summary = "代码生成数据库表分页列表")
    public CommonResult<PageResult<CodegenTableRespVO>> codegenTablePage(@RequestBody CodegenTablePageReqVO pageVO) {
        PageResult<CodegenTable> codegenTablePage = codegenService.codegenTablePage(pageVO);
        return success(CodegenConvert.INSTANCE.convertPageResultVO(codegenTablePage));
    }
}
