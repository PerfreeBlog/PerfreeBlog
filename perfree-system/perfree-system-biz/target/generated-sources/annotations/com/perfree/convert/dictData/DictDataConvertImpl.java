package com.perfree.convert.dictData;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.dictData.vo.DictDataAddReqVO;
import com.perfree.controller.auth.dictData.vo.DictDataRespVO;
import com.perfree.controller.auth.dictData.vo.DictDataUpdateReqVO;
import com.perfree.model.DictData;
import com.perfree.system.api.dictData.dto.DictDataDTO;
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
public class DictDataConvertImpl implements DictDataConvert {

    @Override
    public DictDataRespVO convertRespVO(DictData dictData) {
        if ( dictData == null ) {
            return null;
        }

        DictDataRespVO dictDataRespVO = new DictDataRespVO();

        dictDataRespVO.setDictLabel( dictData.getDictLabel() );
        dictDataRespVO.setDictValue( dictData.getDictValue() );
        dictDataRespVO.setDictExtendValue( dictData.getDictExtendValue() );
        dictDataRespVO.setStatus( dictData.getStatus() );
        dictDataRespVO.setSeq( dictData.getSeq() );
        dictDataRespVO.setDictType( dictData.getDictType() );
        dictDataRespVO.setParentDictType( dictData.getParentDictType() );
        dictDataRespVO.setId( dictData.getId() );
        dictDataRespVO.setCreateTime( dictData.getCreateTime() );

        return dictDataRespVO;
    }

    @Override
    public PageResult<DictDataRespVO> convertPageResultVO(PageResult<DictData> dictDataPageResult) {
        if ( dictDataPageResult == null ) {
            return null;
        }

        PageResult<DictDataRespVO> pageResult = new PageResult<DictDataRespVO>();

        pageResult.setList( convertListRespVO( dictDataPageResult.getList() ) );
        pageResult.setTotal( dictDataPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public DictData convertAddReqVO(DictDataAddReqVO dictDataAddReqVO) {
        if ( dictDataAddReqVO == null ) {
            return null;
        }

        DictData dictData = new DictData();

        dictData.setDictLabel( dictDataAddReqVO.getDictLabel() );
        dictData.setDictValue( dictDataAddReqVO.getDictValue() );
        dictData.setDictExtendValue( dictDataAddReqVO.getDictExtendValue() );
        dictData.setStatus( dictDataAddReqVO.getStatus() );
        dictData.setSeq( dictDataAddReqVO.getSeq() );
        dictData.setDictType( dictDataAddReqVO.getDictType() );
        dictData.setParentDictType( dictDataAddReqVO.getParentDictType() );

        return dictData;
    }

    @Override
    public DictData convertUpdateReqVO(DictDataUpdateReqVO dictDataUpdateReqVO) {
        if ( dictDataUpdateReqVO == null ) {
            return null;
        }

        DictData dictData = new DictData();

        dictData.setId( dictDataUpdateReqVO.getId() );
        dictData.setDictLabel( dictDataUpdateReqVO.getDictLabel() );
        dictData.setDictValue( dictDataUpdateReqVO.getDictValue() );
        dictData.setDictExtendValue( dictDataUpdateReqVO.getDictExtendValue() );
        dictData.setStatus( dictDataUpdateReqVO.getStatus() );
        dictData.setSeq( dictDataUpdateReqVO.getSeq() );
        dictData.setDictType( dictDataUpdateReqVO.getDictType() );
        dictData.setParentDictType( dictDataUpdateReqVO.getParentDictType() );

        return dictData;
    }

    @Override
    public List<DictDataRespVO> convertListRespVO(List<DictData> list) {
        if ( list == null ) {
            return null;
        }

        List<DictDataRespVO> list1 = new ArrayList<DictDataRespVO>( list.size() );
        for ( DictData dictData : list ) {
            list1.add( convertRespVO( dictData ) );
        }

        return list1;
    }

    @Override
    public List<DictDataDTO> convertToDTOList(List<DictData> dictDataList) {
        if ( dictDataList == null ) {
            return null;
        }

        List<DictDataDTO> list = new ArrayList<DictDataDTO>( dictDataList.size() );
        for ( DictData dictData : dictDataList ) {
            list.add( convertToDTO( dictData ) );
        }

        return list;
    }

    @Override
    public DictDataDTO convertToDTO(DictData dictData) {
        if ( dictData == null ) {
            return null;
        }

        DictDataDTO dictDataDTO = new DictDataDTO();

        dictDataDTO.setId( dictData.getId() );
        dictDataDTO.setDictLabel( dictData.getDictLabel() );
        dictDataDTO.setDictValue( dictData.getDictValue() );
        dictDataDTO.setDictExtendValue( dictData.getDictExtendValue() );
        dictDataDTO.setSeq( dictData.getSeq() );
        dictDataDTO.setDictType( dictData.getDictType() );
        dictDataDTO.setParentDictType( dictData.getParentDictType() );

        return dictDataDTO;
    }

    @Override
    public List<DictDataRespVO> convertDTOListToRespVOList(List<DictDataDTO> allDictData) {
        if ( allDictData == null ) {
            return null;
        }

        List<DictDataRespVO> list = new ArrayList<DictDataRespVO>( allDictData.size() );
        for ( DictDataDTO dictDataDTO : allDictData ) {
            list.add( dictDataDTOToDictDataRespVO( dictDataDTO ) );
        }

        return list;
    }

    protected DictDataRespVO dictDataDTOToDictDataRespVO(DictDataDTO dictDataDTO) {
        if ( dictDataDTO == null ) {
            return null;
        }

        DictDataRespVO dictDataRespVO = new DictDataRespVO();

        dictDataRespVO.setDictLabel( dictDataDTO.getDictLabel() );
        dictDataRespVO.setDictValue( dictDataDTO.getDictValue() );
        dictDataRespVO.setDictExtendValue( dictDataDTO.getDictExtendValue() );
        dictDataRespVO.setSeq( dictDataDTO.getSeq() );
        dictDataRespVO.setDictType( dictDataDTO.getDictType() );
        dictDataRespVO.setParentDictType( dictDataDTO.getParentDictType() );
        dictDataRespVO.setId( dictDataDTO.getId() );

        return dictDataRespVO;
    }
}
