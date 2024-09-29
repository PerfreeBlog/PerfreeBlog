package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.attachLibraryItems.vo.*;
import com.perfree.model.AttachLibraryItems;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;

import java.util.List;
import java.util.Objects;




/**
* @description 附件库数据
* @author Perfree
*/
@Mapper
public interface AttachLibraryItemsMapper extends BaseMapperX<AttachLibraryItems> {

    default List<AttachLibraryItems> listAll() {
        return selectList(new LambdaQueryWrapper<AttachLibraryItems>()
            .orderByDesc(AttachLibraryItems::getId)
        );
    }

    default List<AttachLibraryItems> queryExportData(AttachLibraryItemsExportReqVO reqVO){
        LambdaQueryWrapper<AttachLibraryItems> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(null != reqVO.getAttachLibraryId(), AttachLibraryItems::getAttachLibraryId, reqVO.getAttachLibraryId());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getName()), AttachLibraryItems::getName, reqVO.getName());
        lambdaQueryWrapper.orderByDesc(AttachLibraryItems::getId);
        return selectList(lambdaQueryWrapper);
    }

    IPage<AttachLibraryItemsRespVO> attachLibraryItemsPage(IPage<AttachLibraryItemsRespVO> page, @Param("pageVO") AttachLibraryItemsPageReqVO pageVO);

    AttachLibraryItemsRespVO getById(@Param("id") Integer id);
}