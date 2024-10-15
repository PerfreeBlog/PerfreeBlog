package com.perfree.convert.codegen;

import com.baomidou.mybatisplus.generator.config.po.TableField;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.IColumnType;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.codegen.vo.column.CodegenColumnReqVO;
import com.perfree.controller.auth.codegen.vo.column.CodegenColumnRespVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableRespVO;
import com.perfree.model.CodegenColumn;
import com.perfree.model.CodegenTable;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.apache.ibatis.type.JdbcType;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:58+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class CodegenConvertImpl implements CodegenConvert {

    @Override
    public CodegenTable convertToCodegenTable(TableInfo tableInfo) {
        if ( tableInfo == null ) {
            return null;
        }

        CodegenTable codegenTable = new CodegenTable();

        codegenTable.setTableName( tableInfo.getName() );
        codegenTable.setTableComment( tableInfo.getComment() );

        return codegenTable;
    }

    @Override
    public PageResult<CodegenTableRespVO> convertPageResultVO(PageResult<CodegenTable> codegenTablePage) {
        if ( codegenTablePage == null ) {
            return null;
        }

        PageResult<CodegenTableRespVO> pageResult = new PageResult<CodegenTableRespVO>();

        pageResult.setList( codegenTableListToCodegenTableRespVOList( codegenTablePage.getList() ) );
        pageResult.setTotal( codegenTablePage.getTotal() );

        return pageResult;
    }

    @Override
    public CodegenColumn convertToCodegenColum(TableField field) {
        if ( field == null ) {
            return null;
        }

        CodegenColumn codegenColumn = new CodegenColumn();

        codegenColumn.setColumnName( field.getName() );
        JdbcType jdbcType = fieldMetaInfoJdbcType( field );
        if ( jdbcType != null ) {
            codegenColumn.setDataType( jdbcType.name() );
        }
        codegenColumn.setColumnComment( field.getComment() );
        codegenColumn.setPrimaryKey( field.isKeyFlag() );
        codegenColumn.setAutoIncrement( field.isKeyIdentityFlag() );
        codegenColumn.setNullable( fieldMetaInfoNullable( field ) );
        codegenColumn.setJavaType( fieldColumnTypeType( field ) );
        codegenColumn.setJavaField( field.getPropertyName() );

        return codegenColumn;
    }

    @Override
    public CodegenTableRespVO ConvertToTableRespVO(CodegenTable codegenTable) {
        if ( codegenTable == null ) {
            return null;
        }

        CodegenTableRespVO codegenTableRespVO = new CodegenTableRespVO();

        codegenTableRespVO.setScene( codegenTable.getScene() );
        codegenTableRespVO.setTableName( codegenTable.getTableName() );
        codegenTableRespVO.setTableComment( codegenTable.getTableComment() );
        codegenTableRespVO.setModuleName( codegenTable.getModuleName() );
        codegenTableRespVO.setFrontModuleName( codegenTable.getFrontModuleName() );
        codegenTableRespVO.setClassName( codegenTable.getClassName() );
        codegenTableRespVO.setClassComment( codegenTable.getClassComment() );
        codegenTableRespVO.setAuthor( codegenTable.getAuthor() );
        codegenTableRespVO.setParentMenuId( codegenTable.getParentMenuId() );
        codegenTableRespVO.setPackageName( codegenTable.getPackageName() );
        codegenTableRespVO.setMapperLocation( codegenTable.getMapperLocation() );
        if ( codegenTable.getId() != null ) {
            codegenTableRespVO.setId( codegenTable.getId().longValue() );
        }
        codegenTableRespVO.setCreateTime( codegenTable.getCreateTime() );
        codegenTableRespVO.setUpdateTime( codegenTable.getUpdateTime() );

        return codegenTableRespVO;
    }

    @Override
    public List<CodegenColumnRespVO> ConvertToColumnListRespVO(List<CodegenColumn> codegenColumnList) {
        if ( codegenColumnList == null ) {
            return null;
        }

        List<CodegenColumnRespVO> list = new ArrayList<CodegenColumnRespVO>( codegenColumnList.size() );
        for ( CodegenColumn codegenColumn : codegenColumnList ) {
            list.add( codegenColumnToCodegenColumnRespVO( codegenColumn ) );
        }

        return list;
    }

    @Override
    public CodegenTable convertByCodegenTableReqVO(CodegenTableReqVO codegenTable) {
        if ( codegenTable == null ) {
            return null;
        }

        CodegenTable codegenTable1 = new CodegenTable();

        if ( codegenTable.getId() != null ) {
            codegenTable1.setId( codegenTable.getId().intValue() );
        }
        codegenTable1.setScene( codegenTable.getScene() );
        codegenTable1.setTableName( codegenTable.getTableName() );
        codegenTable1.setTableComment( codegenTable.getTableComment() );
        codegenTable1.setModuleName( codegenTable.getModuleName() );
        codegenTable1.setFrontModuleName( codegenTable.getFrontModuleName() );
        codegenTable1.setClassName( codegenTable.getClassName() );
        codegenTable1.setClassComment( codegenTable.getClassComment() );
        codegenTable1.setAuthor( codegenTable.getAuthor() );
        codegenTable1.setParentMenuId( codegenTable.getParentMenuId() );
        codegenTable1.setPackageName( codegenTable.getPackageName() );
        codegenTable1.setMapperLocation( codegenTable.getMapperLocation() );

        return codegenTable1;
    }

    @Override
    public CodegenColumn convertByCodegenColumnReqVO(CodegenColumnReqVO codegenColumnReqVO) {
        if ( codegenColumnReqVO == null ) {
            return null;
        }

        CodegenColumn codegenColumn = new CodegenColumn();

        if ( codegenColumnReqVO.getId() != null ) {
            codegenColumn.setId( codegenColumnReqVO.getId().intValue() );
        }
        codegenColumn.setTableId( codegenColumnReqVO.getTableId() );
        codegenColumn.setColumnName( codegenColumnReqVO.getColumnName() );
        codegenColumn.setDataType( codegenColumnReqVO.getDataType() );
        codegenColumn.setColumnComment( codegenColumnReqVO.getColumnComment() );
        codegenColumn.setNullable( codegenColumnReqVO.getNullable() );
        codegenColumn.setPrimaryKey( codegenColumnReqVO.getPrimaryKey() );
        codegenColumn.setAutoIncrement( codegenColumnReqVO.getAutoIncrement() );
        codegenColumn.setJavaType( codegenColumnReqVO.getJavaType() );
        codegenColumn.setJavaField( codegenColumnReqVO.getJavaField() );
        codegenColumn.setInsertOperation( codegenColumnReqVO.getInsertOperation() );
        codegenColumn.setUpdateOperation( codegenColumnReqVO.getUpdateOperation() );
        codegenColumn.setListOperation( codegenColumnReqVO.getListOperation() );
        codegenColumn.setListQueryOperation( codegenColumnReqVO.getListQueryOperation() );
        codegenColumn.setFormType( codegenColumnReqVO.getFormType() );
        codegenColumn.setQueryType( codegenColumnReqVO.getQueryType() );
        codegenColumn.setDictType( codegenColumnReqVO.getDictType() );

        return codegenColumn;
    }

    protected List<CodegenTableRespVO> codegenTableListToCodegenTableRespVOList(List<CodegenTable> list) {
        if ( list == null ) {
            return null;
        }

        List<CodegenTableRespVO> list1 = new ArrayList<CodegenTableRespVO>( list.size() );
        for ( CodegenTable codegenTable : list ) {
            list1.add( ConvertToTableRespVO( codegenTable ) );
        }

        return list1;
    }

    private JdbcType fieldMetaInfoJdbcType(TableField tableField) {
        TableField.MetaInfo metaInfo = tableField.getMetaInfo();
        if ( metaInfo == null ) {
            return null;
        }
        return metaInfo.getJdbcType();
    }

    private Boolean fieldMetaInfoNullable(TableField tableField) {
        TableField.MetaInfo metaInfo = tableField.getMetaInfo();
        if ( metaInfo == null ) {
            return null;
        }
        return metaInfo.isNullable();
    }

    private String fieldColumnTypeType(TableField tableField) {
        IColumnType columnType = tableField.getColumnType();
        if ( columnType == null ) {
            return null;
        }
        return columnType.getType();
    }

    protected CodegenColumnRespVO codegenColumnToCodegenColumnRespVO(CodegenColumn codegenColumn) {
        if ( codegenColumn == null ) {
            return null;
        }

        CodegenColumnRespVO codegenColumnRespVO = new CodegenColumnRespVO();

        codegenColumnRespVO.setTableId( codegenColumn.getTableId() );
        codegenColumnRespVO.setColumnName( codegenColumn.getColumnName() );
        codegenColumnRespVO.setDataType( codegenColumn.getDataType() );
        codegenColumnRespVO.setColumnComment( codegenColumn.getColumnComment() );
        codegenColumnRespVO.setNullable( codegenColumn.getNullable() );
        codegenColumnRespVO.setPrimaryKey( codegenColumn.getPrimaryKey() );
        codegenColumnRespVO.setAutoIncrement( codegenColumn.getAutoIncrement() );
        codegenColumnRespVO.setJavaType( codegenColumn.getJavaType() );
        codegenColumnRespVO.setJavaField( codegenColumn.getJavaField() );
        codegenColumnRespVO.setInsertOperation( codegenColumn.getInsertOperation() );
        codegenColumnRespVO.setUpdateOperation( codegenColumn.getUpdateOperation() );
        codegenColumnRespVO.setListOperation( codegenColumn.getListOperation() );
        codegenColumnRespVO.setListQueryOperation( codegenColumn.getListQueryOperation() );
        codegenColumnRespVO.setFormType( codegenColumn.getFormType() );
        codegenColumnRespVO.setQueryType( codegenColumn.getQueryType() );
        codegenColumnRespVO.setDictType( codegenColumn.getDictType() );
        if ( codegenColumn.getId() != null ) {
            codegenColumnRespVO.setId( codegenColumn.getId().longValue() );
        }
        codegenColumnRespVO.setCreateTime( codegenColumn.getCreateTime() );
        codegenColumnRespVO.setUpdateTime( codegenColumn.getUpdateTime() );

        return codegenColumnRespVO;
    }
}
