package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.codegen.vo.table.CodegenTablePageReqVO;
import com.perfree.model.CodegenTable;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.solon.annotation.Db;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface CodegenTableMapper extends BaseMapper<CodegenTable> {

    default List<CodegenTable> codegenTablePage(CodegenTablePageReqVO pageVO){
        return selectListByQuery(new QueryWrapper()
                .eq(CodegenTable::getTableName, pageVO.getTableName())
                .orderBy(CodegenTable::getId,false)
        );
    }

}
