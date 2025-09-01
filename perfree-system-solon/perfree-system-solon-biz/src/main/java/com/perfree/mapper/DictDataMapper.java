package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.constant.DictConstant;
import com.perfree.controller.auth.dictData.vo.*;
import com.perfree.model.DictData;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;
import org.apache.ibatis.solon.annotation.Db;

import java.util.List;
import java.util.Objects;




/**
* @description 数据字典值
* @author Perfree
*/
@Mapper
public interface DictDataMapper extends BaseMapperX<DictData> {

    default PageResult<DictData> selectPage(DictDataPageReqVO reqVO) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.like(DictData::getDictLabel, reqVO.getDictLabel());
        wrapper.like(DictData::getDictType, reqVO.getDictType());
        wrapper.eq(DictData::getParentDictType, reqVO.getParentDictType());
        wrapper.orderBy(DictData::getSeq,false);
        return selectPage(reqVO, wrapper);
    }

    default List<DictData> listAll() {
        return selectListByQuery(new QueryWrapper()
            .orderBy(DictData::getId,false)
        );
    }

    default List<DictData> queryByParentDictType(String parentDictType){
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.eq(DictData::getParentDictType, parentDictType);
        wrapper.orderBy(DictData::getSeq);
        return selectListByQuery(wrapper);
    }

    default DictData queryByDictType(String dictType){
        return selectOneByQuery(new QueryWrapper().eq(DictData::getDictType, dictType));
    }

    List<DictData> listByStatus(@Param("status") Integer status);
}