package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.attachLibrary.vo.*;
import com.perfree.model.AttachLibrary;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;
import org.apache.ibatis.solon.annotation.Db;

import java.util.List;
import java.util.Objects;




/**
* @description 附件库
* @author Perfree
*/
@Mapper
public interface AttachLibraryMapper extends BaseMapper<AttachLibrary> {

    default List<AttachLibrary> listAll() {
        return selectListByQuery(new QueryWrapper()
            .orderBy(AttachLibrary::getId,false)
        );
    }

    default List<AttachLibrary> queryExportData(AttachLibraryExportReqVO reqVO){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like(AttachLibrary::getName, reqVO.getName());
        queryWrapper.eq(AttachLibrary::getType, reqVO.getType());
        queryWrapper.eq(AttachLibrary::getVisibility, reqVO.getVisibility());
        queryWrapper.orderBy(AttachLibrary::getId,false);
        return selectListByQuery(queryWrapper);
    }

    List<AttachLibraryRespVO> attachLibraryPage(@Param("pageVO") AttachLibraryPageReqVO pageVO, @Param("loginUserId") Integer loginUserId);

    AttachLibraryRespVO getById(@Param("id") Integer id);

}