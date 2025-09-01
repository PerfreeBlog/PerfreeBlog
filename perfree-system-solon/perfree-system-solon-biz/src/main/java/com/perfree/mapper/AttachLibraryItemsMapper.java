package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryCondition;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.attachLibraryItems.vo.*;
import com.perfree.model.AttachLibraryItems;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.solon.annotation.Db;

import java.util.List;




/**
* @description 附件库数据
* @author Perfree
*/
@Mapper
public interface AttachLibraryItemsMapper extends BaseMapperX<AttachLibraryItems> {

    default List<AttachLibraryItems> listAll() {
        return selectListByQuery(new QueryWrapper()
            .orderBy(AttachLibraryItems::getId,false)
        );
    }

    default List<AttachLibraryItems> queryExportData(AttachLibraryItemsExportReqVO reqVO){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq(AttachLibraryItems::getAttachLibraryId, reqVO.getAttachLibraryId());
        queryWrapper.like( AttachLibraryItems::getName, reqVO.getName());
        queryWrapper.orderBy(AttachLibraryItems::getId, false);
        return selectListByQuery(queryWrapper);
    }

    IPage<AttachLibraryItemsRespVO> attachLibraryItemsPage(IPage<AttachLibraryItemsRespVO> page, @Param("pageVO") AttachLibraryItemsPageReqVO pageVO);

    AttachLibraryItemsRespVO getById(@Param("id") Integer id);
}