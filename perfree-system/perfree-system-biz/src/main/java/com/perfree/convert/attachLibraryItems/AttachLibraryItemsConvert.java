package com.perfree.convert.attachLibraryItems;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachLibraryItems.vo.*;
import com.perfree.model.AttachLibraryItems;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

/**
 * @description 附件库数据 Convert
 * @author Perfree
 **/
@Mapper(componentModel = "spring")
public interface AttachLibraryItemsConvert {
    AttachLibraryItemsConvert INSTANCE = Mappers.getMapper(AttachLibraryItemsConvert.class);

    /**
     * model转RespVO
     * @param attachLibraryItems attachLibraryItems
     * @return AttachLibraryItemsRespVO
     */
    AttachLibraryItemsRespVO convertRespVO(AttachLibraryItems attachLibraryItems);

    /**
     * model PageResult转RespVO PageResult
     * @param attachLibraryItemsPageResult attachLibraryItemsPageResult
     * @return PageResult
     */
    PageResult<AttachLibraryItemsRespVO> convertPageResultVO(PageResult<AttachLibraryItems> attachLibraryItemsPageResult);

    /**
     * AddReqVO转model
     * @param attachLibraryItemsAddReqVO attachLibraryItemsAddReqVO
     * @return AttachLibraryItems
     */
    AttachLibraryItems convertAddReqVO(AttachLibraryItemsAddReqVO attachLibraryItemsAddReqVO);

    /**
     * UpdateReqVO转model
     * @param attachLibraryItemsUpdateReqVO attachLibraryItemsUpdateReqVO
     * @return AttachLibraryItems
     */
    AttachLibraryItems convertUpdateReqVO(AttachLibraryItemsUpdateReqVO attachLibraryItemsUpdateReqVO);

    /**
     * model List转RespVO List
     * @param list list
     * @return List<AttachLibraryItemsRespVO>
     */
    List<AttachLibraryItemsRespVO> convertListRespVO(List<AttachLibraryItems> list);

    /**
     * model List转ExcelVO List
     * @param list list
     * @return List<AttachLibraryItemsExcelVO>
     */
    List<AttachLibraryItemsExcelVO> convertToExcelVOList(List<AttachLibraryItems> list);

    List<AttachLibraryItems> convertBatchAddReqVO(List<AttachLibraryItemsAddReqVO> list);
}