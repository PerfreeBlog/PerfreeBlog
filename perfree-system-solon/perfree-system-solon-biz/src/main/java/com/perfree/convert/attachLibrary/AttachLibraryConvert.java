package com.perfree.convert.attachLibrary;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachLibrary.vo.*;
import com.perfree.model.AttachLibrary;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

/**
 * @description 附件库 Convert
 * @author Perfree
 **/
@Mapper(componentModel = "spring")
public interface AttachLibraryConvert {
    AttachLibraryConvert INSTANCE = Mappers.getMapper(AttachLibraryConvert.class);

    /**
     * model转RespVO
     * @param attachLibrary attachLibrary
     * @return AttachLibraryRespVO
     */
    AttachLibraryRespVO convertRespVO(AttachLibrary attachLibrary);

    /**
     * model PageResult转RespVO PageResult
     * @param attachLibraryPageResult attachLibraryPageResult
     * @return PageResult
     */
    PageResult<AttachLibraryRespVO> convertPageResultVO(PageResult<AttachLibrary> attachLibraryPageResult);

    /**
     * AddReqVO转model
     * @param attachLibraryAddReqVO attachLibraryAddReqVO
     * @return AttachLibrary
     */
    AttachLibrary convertAddReqVO(AttachLibraryAddReqVO attachLibraryAddReqVO);

    /**
     * UpdateReqVO转model
     * @param attachLibraryUpdateReqVO attachLibraryUpdateReqVO
     * @return AttachLibrary
     */
    AttachLibrary convertUpdateReqVO(AttachLibraryUpdateReqVO attachLibraryUpdateReqVO);

    /**
     * model List转RespVO List
     * @param list list
     * @return List<AttachLibraryRespVO>
     */
    List<AttachLibraryRespVO> convertListRespVO(List<AttachLibrary> list);

    /**
     * model List转ExcelVO List
     * @param list list
     * @return List<AttachLibraryExcelVO>
     */
    List<AttachLibraryExcelVO> convertToExcelVOList(List<AttachLibrary> list);
}