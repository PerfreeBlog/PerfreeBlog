package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.dict.vo.*;
import com.perfree.model.Dict;
import com.perfree.model.DictData;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;
import org.apache.ibatis.solon.annotation.Db;

import java.util.List;
import java.util.Objects;




/**
* @description 数据字典
* @author Perfree
*/
@Mapper
public interface DictMapper extends BaseMapper<Dict> {

    default List<Dict> selectPage(DictPageReqVO reqVO) {
        QueryWrapper queryWrapper = QueryWrapper.create();
        queryWrapper.like(Dict::getDictType, reqVO.getDictType());
        queryWrapper.like(Dict::getDictName, reqVO.getDictName());
        queryWrapper.orderBy(Dict::getSeq);
        return selectListByQuery(queryWrapper);
    }

    default List<Dict> listAll() {
        return selectListByQuery(new QueryWrapper()
            .orderBy(Dict::getId,false)
        );
    }

    default List<Dict> queryListAll(String dictType, String dictName){
        return selectListByQuery(new QueryWrapper()
                .like(Dict::getDictType, dictType)
                .or(Dict::getDictName)
                .like(dictName)
                .orderBy(Dict::getId,false)
        );
    }

    default Dict queryByDictType(String dictType){
        return selectOneByQuery(new QueryWrapper().eq(Dict::getDictType, dictType));
    }
}