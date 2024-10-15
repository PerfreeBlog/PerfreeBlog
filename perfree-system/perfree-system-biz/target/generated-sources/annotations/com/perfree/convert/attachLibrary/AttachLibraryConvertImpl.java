package com.perfree.convert.attachLibrary;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryAddReqVO;
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryExcelVO;
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryRespVO;
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryUpdateReqVO;
import com.perfree.model.AttachLibrary;
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
public class AttachLibraryConvertImpl implements AttachLibraryConvert {

    @Override
    public AttachLibraryRespVO convertRespVO(AttachLibrary attachLibrary) {
        if ( attachLibrary == null ) {
            return null;
        }

        AttachLibraryRespVO attachLibraryRespVO = new AttachLibraryRespVO();

        attachLibraryRespVO.setName( attachLibrary.getName() );
        attachLibraryRespVO.setDescription( attachLibrary.getDescription() );
        attachLibraryRespVO.setType( attachLibrary.getType() );
        attachLibraryRespVO.setVisibility( attachLibrary.getVisibility() );
        attachLibraryRespVO.setThumbnail( attachLibrary.getThumbnail() );
        attachLibraryRespVO.setId( attachLibrary.getId() );
        attachLibraryRespVO.setCreateTime( attachLibrary.getCreateTime() );

        return attachLibraryRespVO;
    }

    @Override
    public PageResult<AttachLibraryRespVO> convertPageResultVO(PageResult<AttachLibrary> attachLibraryPageResult) {
        if ( attachLibraryPageResult == null ) {
            return null;
        }

        PageResult<AttachLibraryRespVO> pageResult = new PageResult<AttachLibraryRespVO>();

        pageResult.setList( convertListRespVO( attachLibraryPageResult.getList() ) );
        pageResult.setTotal( attachLibraryPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public AttachLibrary convertAddReqVO(AttachLibraryAddReqVO attachLibraryAddReqVO) {
        if ( attachLibraryAddReqVO == null ) {
            return null;
        }

        AttachLibrary attachLibrary = new AttachLibrary();

        attachLibrary.setName( attachLibraryAddReqVO.getName() );
        attachLibrary.setDescription( attachLibraryAddReqVO.getDescription() );
        attachLibrary.setType( attachLibraryAddReqVO.getType() );
        attachLibrary.setVisibility( attachLibraryAddReqVO.getVisibility() );
        attachLibrary.setThumbnail( attachLibraryAddReqVO.getThumbnail() );

        return attachLibrary;
    }

    @Override
    public AttachLibrary convertUpdateReqVO(AttachLibraryUpdateReqVO attachLibraryUpdateReqVO) {
        if ( attachLibraryUpdateReqVO == null ) {
            return null;
        }

        AttachLibrary attachLibrary = new AttachLibrary();

        attachLibrary.setId( attachLibraryUpdateReqVO.getId() );
        attachLibrary.setName( attachLibraryUpdateReqVO.getName() );
        attachLibrary.setDescription( attachLibraryUpdateReqVO.getDescription() );
        attachLibrary.setType( attachLibraryUpdateReqVO.getType() );
        attachLibrary.setVisibility( attachLibraryUpdateReqVO.getVisibility() );
        attachLibrary.setThumbnail( attachLibraryUpdateReqVO.getThumbnail() );

        return attachLibrary;
    }

    @Override
    public List<AttachLibraryRespVO> convertListRespVO(List<AttachLibrary> list) {
        if ( list == null ) {
            return null;
        }

        List<AttachLibraryRespVO> list1 = new ArrayList<AttachLibraryRespVO>( list.size() );
        for ( AttachLibrary attachLibrary : list ) {
            list1.add( convertRespVO( attachLibrary ) );
        }

        return list1;
    }

    @Override
    public List<AttachLibraryExcelVO> convertToExcelVOList(List<AttachLibrary> list) {
        if ( list == null ) {
            return null;
        }

        List<AttachLibraryExcelVO> list1 = new ArrayList<AttachLibraryExcelVO>( list.size() );
        for ( AttachLibrary attachLibrary : list ) {
            list1.add( attachLibraryToAttachLibraryExcelVO( attachLibrary ) );
        }

        return list1;
    }

    protected AttachLibraryExcelVO attachLibraryToAttachLibraryExcelVO(AttachLibrary attachLibrary) {
        if ( attachLibrary == null ) {
            return null;
        }

        AttachLibraryExcelVO attachLibraryExcelVO = new AttachLibraryExcelVO();

        attachLibraryExcelVO.setName( attachLibrary.getName() );
        attachLibraryExcelVO.setDescription( attachLibrary.getDescription() );
        attachLibraryExcelVO.setType( attachLibrary.getType() );
        attachLibraryExcelVO.setVisibility( attachLibrary.getVisibility() );
        attachLibraryExcelVO.setThumbnail( attachLibrary.getThumbnail() );
        attachLibraryExcelVO.setCreateTime( attachLibrary.getCreateTime() );

        return attachLibraryExcelVO;
    }
}
