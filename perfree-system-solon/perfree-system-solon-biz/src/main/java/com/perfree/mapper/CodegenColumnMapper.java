package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.CodegenColumn;
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
public interface CodegenColumnMapper extends BaseMapperX<CodegenColumn> {


    default List<CodegenColumn> selectByTableId(Integer tableId){
        return selectListByQuery(new QueryWrapper()
                .eq(CodegenColumn::getTableId, tableId)
                .orderBy(CodegenColumn::getCreateTime,false));
    }

    default void delByTableId(Integer tableId){
        deleteByQuery(new QueryWrapper().eq(CodegenColumn::getTableId, tableId));
    }

}
