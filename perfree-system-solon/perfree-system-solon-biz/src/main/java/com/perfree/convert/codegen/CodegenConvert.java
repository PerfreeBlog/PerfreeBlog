package com.perfree.convert.codegen;


import com.mybatisflex.codegen.entity.Column;
import com.mybatisflex.codegen.entity.Table;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.codegen.vo.column.CodegenColumnReqVO;
import com.perfree.controller.auth.codegen.vo.column.CodegenColumnRespVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableRespVO;
import com.perfree.model.CodegenColumn;
import com.perfree.model.CodegenTable;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CodegenConvert {
    CodegenConvert INSTANCE = Mappers.getMapper(CodegenConvert.class);

    @Mappings({
            @Mapping(source = "name", target = "tableName"),
            @Mapping(source = "comment", target = "tableComment"),
    })
    CodegenTable convertToCodegenTable(Table tableInfo);

    PageResult<CodegenTableRespVO> convertPageResultVO(PageResult<CodegenTable> codegenTablePage);

    @Mappings({
            @Mapping(source = "name", target = "columnName"),
            @Mapping(source = "columnConfig.jdbcType", target = "dataType"),
            @Mapping(source = "comment", target = "columnComment"),
//            @Mapping(source = "columnConfig.isPrimaryKey", target = "primaryKey"),
//            @Mapping(source = "nullable", target = "nullable"),
//            @Mapping(source = "property", target = "javaField"),

    })
    CodegenColumn convertToCodegenColum(Column field);

    CodegenTableRespVO ConvertToTableRespVO(CodegenTable codegenTable);

    List<CodegenColumnRespVO> ConvertToColumnListRespVO(List<CodegenColumn> codegenColumnList);

    CodegenTable convertByCodegenTableReqVO(CodegenTableReqVO codegenTable);

    CodegenColumn convertByCodegenColumnReqVO(CodegenColumnReqVO codegenColumnReqVO);

    List<CodegenTableRespVO> ConvertToTableListRespVO(List<CodegenTable> codegenTableList);

}
