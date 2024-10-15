package com.perfree.convert.attachLibraryItems;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachLibraryItems.vo.AttachLibraryItemsAddReqVO;
import com.perfree.controller.auth.attachLibraryItems.vo.AttachLibraryItemsExcelVO;
import com.perfree.controller.auth.attachLibraryItems.vo.AttachLibraryItemsRespVO;
import com.perfree.controller.auth.attachLibraryItems.vo.AttachLibraryItemsUpdateReqVO;
import com.perfree.model.AttachLibraryItems;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:59+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class AttachLibraryItemsConvertImpl implements AttachLibraryItemsConvert {

    @Override
    public AttachLibraryItemsRespVO convertRespVO(AttachLibraryItems attachLibraryItems) {
        if ( attachLibraryItems == null ) {
            return null;
        }

        AttachLibraryItemsRespVO attachLibraryItemsRespVO = new AttachLibraryItemsRespVO();

        attachLibraryItemsRespVO.setAttachLibraryId( attachLibraryItems.getAttachLibraryId() );
        attachLibraryItemsRespVO.setUrl( attachLibraryItems.getUrl() );
        attachLibraryItemsRespVO.setName( attachLibraryItems.getName() );
        attachLibraryItemsRespVO.setDescription( attachLibraryItems.getDescription() );
        attachLibraryItemsRespVO.setId( attachLibraryItems.getId() );
        attachLibraryItemsRespVO.setCreateTime( attachLibraryItems.getCreateTime() );

        return attachLibraryItemsRespVO;
    }

    @Override
    public PageResult<AttachLibraryItemsRespVO> convertPageResultVO(PageResult<AttachLibraryItems> attachLibraryItemsPageResult) {
        if ( attachLibraryItemsPageResult == null ) {
            return null;
        }

        PageResult<AttachLibraryItemsRespVO> pageResult = new PageResult<AttachLibraryItemsRespVO>();

        pageResult.setList( convertListRespVO( attachLibraryItemsPageResult.getList() ) );
        pageResult.setTotal( attachLibraryItemsPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public AttachLibraryItems convertAddReqVO(AttachLibraryItemsAddReqVO attachLibraryItemsAddReqVO) {
        if ( attachLibraryItemsAddReqVO == null ) {
            return null;
        }

        AttachLibraryItems attachLibraryItems = new AttachLibraryItems();

        attachLibraryItems.setAttachLibraryId( attachLibraryItemsAddReqVO.getAttachLibraryId() );
        attachLibraryItems.setUrl( attachLibraryItemsAddReqVO.getUrl() );
        attachLibraryItems.setName( attachLibraryItemsAddReqVO.getName() );
        attachLibraryItems.setDescription( attachLibraryItemsAddReqVO.getDescription() );

        return attachLibraryItems;
    }

    @Override
    public AttachLibraryItems convertUpdateReqVO(AttachLibraryItemsUpdateReqVO attachLibraryItemsUpdateReqVO) {
        if ( attachLibraryItemsUpdateReqVO == null ) {
            return null;
        }

        AttachLibraryItems attachLibraryItems = new AttachLibraryItems();

        attachLibraryItems.setId( attachLibraryItemsUpdateReqVO.getId() );
        attachLibraryItems.setAttachLibraryId( attachLibraryItemsUpdateReqVO.getAttachLibraryId() );
        attachLibraryItems.setUrl( attachLibraryItemsUpdateReqVO.getUrl() );
        attachLibraryItems.setName( attachLibraryItemsUpdateReqVO.getName() );
        attachLibraryItems.setDescription( attachLibraryItemsUpdateReqVO.getDescription() );

        return attachLibraryItems;
    }

    @Override
    public List<AttachLibraryItemsRespVO> convertListRespVO(List<AttachLibraryItems> list) {
        if ( list == null ) {
            return null;
        }

        List<AttachLibraryItemsRespVO> list1 = new ArrayList<AttachLibraryItemsRespVO>( list.size() );
        for ( AttachLibraryItems attachLibraryItems : list ) {
            list1.add( convertRespVO( attachLibraryItems ) );
        }

        return list1;
    }

    @Override
    public List<AttachLibraryItemsExcelVO> convertToExcelVOList(List<AttachLibraryItems> list) {
        if ( list == null ) {
            return null;
        }

        List<AttachLibraryItemsExcelVO> list1 = new ArrayList<AttachLibraryItemsExcelVO>( list.size() );
        for ( AttachLibraryItems attachLibraryItems : list ) {
            list1.add( attachLibraryItemsToAttachLibraryItemsExcelVO( attachLibraryItems ) );
        }

        return list1;
    }

    @Override
    public List<AttachLibraryItems> convertBatchAddReqVO(List<AttachLibraryItemsAddReqVO> list) {
        if ( list == null ) {
            return null;
        }

        List<AttachLibraryItems> list1 = new ArrayList<AttachLibraryItems>( list.size() );
        for ( AttachLibraryItemsAddReqVO attachLibraryItemsAddReqVO : list ) {
            list1.add( convertAddReqVO( attachLibraryItemsAddReqVO ) );
        }

        return list1;
    }

    protected AttachLibraryItemsExcelVO attachLibraryItemsToAttachLibraryItemsExcelVO(AttachLibraryItems attachLibraryItems) {
        if ( attachLibraryItems == null ) {
            return null;
        }

        AttachLibraryItemsExcelVO attachLibraryItemsExcelVO = new AttachLibraryItemsExcelVO();

        attachLibraryItemsExcelVO.setAttachLibraryId( attachLibraryItems.getAttachLibraryId() );
        attachLibraryItemsExcelVO.setUrl( attachLibraryItems.getUrl() );
        attachLibraryItemsExcelVO.setCreateTime( attachLibraryItems.getCreateTime() );
        attachLibraryItemsExcelVO.setName( attachLibraryItems.getName() );

        return attachLibraryItemsExcelVO;
    }
}
