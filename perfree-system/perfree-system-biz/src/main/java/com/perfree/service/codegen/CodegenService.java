package com.perfree.service.codegen;

import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.codegen.vo.CodegenCreateListReqVO;
import com.perfree.controller.auth.codegen.vo.CodegenTableListReqVO;
import com.perfree.controller.auth.codegen.vo.CodegenTablePageReqVO;
import com.perfree.model.CodegenTable;

import java.util.List;

public interface CodegenService {
    List<TableInfo> getTableList(CodegenTableListReqVO codegenTableListReqVO);

    void createCodegenList(CodegenCreateListReqVO reqVO);

    PageResult<CodegenTable> codegenTablePage(CodegenTablePageReqVO pageVO);

}
