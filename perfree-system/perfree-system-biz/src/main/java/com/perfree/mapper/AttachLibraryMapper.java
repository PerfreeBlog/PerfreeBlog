package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.attachLibrary.vo.*;
import com.perfree.model.AttachLibrary;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;

import java.util.List;
import java.util.Objects;




/**
* @description 附件库
* @author Perfree
*/
@Mapper
public interface AttachLibraryMapper extends BaseMapperX<AttachLibrary> {

    default List<AttachLibrary> listAll() {
        return selectList(new LambdaQueryWrapper<AttachLibrary>()
            .orderByDesc(AttachLibrary::getId)
        );
    }

    default List<AttachLibrary> queryExportData(AttachLibraryExportReqVO reqVO){
        LambdaQueryWrapper<AttachLibrary> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getName()), AttachLibrary::getName, reqVO.getName());
        lambdaQueryWrapper.eq(null != reqVO.getType(), AttachLibrary::getType, reqVO.getType());
        lambdaQueryWrapper.eq(null != reqVO.getVisibility(), AttachLibrary::getVisibility, reqVO.getVisibility());
        lambdaQueryWrapper.orderByDesc(AttachLibrary::getId);
        return selectList(lambdaQueryWrapper);
    }

    IPage<AttachLibraryRespVO> attachLibraryPage(IPage<AttachLibraryRespVO> page, @Param("pageVO") AttachLibraryPageReqVO pageVO, @Param("loginUserId") Integer loginUserId);

    AttachLibraryRespVO getById(@Param("id") Integer id);

}