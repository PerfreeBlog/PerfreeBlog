package com.perfree.controller.auth.codegen;


import com.perfree.demoModel.DemoMode;
import org.dromara.hutool.http.server.HttpServerResponse;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.codegen.vo.*;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableListReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTablePageReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableRespVO;
import com.perfree.convert.codegen.CodegenConvert;
import com.perfree.model.CodegenTable;
import com.perfree.service.codegen.CodegenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getCodegenInfoByTableId")
    @Operation(summary = "根据表id获取代码生成信息")
    public CommonResult<CodegenInfoRespVO> getCodegenInfoByTableId(@RequestParam(value = "tableId") Integer tableId) {
        return success(codegenService.getCodegenInfoByTableId(tableId));
    }

    @PostMapping("/saveConfig")
    @Operation(summary = "保存代码生成配置")
    public CommonResult<Boolean> saveConfig(@RequestBody CodegenInfoReqVO codegenInfoReqVO) {
        return success(codegenService.saveConfig(codegenInfoReqVO));
    }

    @GetMapping("/getCodeFileList")
    @Operation(summary = "获取生成文件列表")
    public CommonResult<List<CodegenFileListRespVO>> getCodeFileList(@RequestParam(value = "tableId") Integer tableId) {
        return success(codegenService.getCodeFileList(tableId));
    }

    @PostMapping("/getCodeFileContent")
    @Operation(summary = "获取代码文件内容")
    @ResponseBody
    public CommonResult<String> getCodeFileContent(@RequestBody CodeFileContentReqVO codeFileContentReqVO) {
        return success(codegenService.getCodeFileContent(codeFileContentReqVO));
    }

    @DeleteMapping("/del")
    @Operation(summary = "删除生成的数据")
    @DemoMode
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(codegenService.del(id));
    }

    @GetMapping("/download")
    @Operation(summary = "下载")
    public void download(@RequestParam(value = "id") Integer id, HttpServletResponse response) {
        codegenService.download(id, response);
    }


}
