package com.perfree.convert.codegen;


import com.baomidou.mybatisplus.generator.config.po.TableField;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.codegen.vo.CodegenTableRespVO;
import com.perfree.model.CodegenColumn;
import com.perfree.model.CodegenTable;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CodegenConvert {
    CodegenConvert INSTANCE = Mappers.getMapper(CodegenConvert.class);

    @Mappings({
            @Mapping(source = "name", target = "tableName"),
            @Mapping(source = "comment", target = "tableComment"),
    })
    CodegenTable convertToCodegenTable(TableInfo tableInfo);

    PageResult<CodegenTableRespVO> convertPageResultVO(PageResult<CodegenTable> codegenTablePage);

    @Mappings({
            @Mapping(source = "name", target = "columnName"),
            @Mapping(source = "columnType.type", target = "dataType"),
            @Mapping(source = "comment", target = "columnComment"),
            @Mapping(source = "keyFlag", target = "primaryKey"),
            @Mapping(source = "keyIdentityFlag", target = "autoIncrement"),
            @Mapping(source = "metaInfo.nullable", target = "nullable"),

    })
    CodegenColumn convertToCodegenColum(TableField field);

}
