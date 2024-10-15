package com.perfree.convert.option;

import com.perfree.controller.auth.option.vo.OptionAddReqVO;
import com.perfree.controller.auth.option.vo.OptionRespVO;
import com.perfree.model.Option;
import com.perfree.system.api.option.dto.OptionDTO;
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
public class OptionConvertImpl implements OptionConvert {

    @Override
    public List<OptionDTO> convertCacheDTO(List<Option> optionList) {
        if ( optionList == null ) {
            return null;
        }

        List<OptionDTO> list = new ArrayList<OptionDTO>( optionList.size() );
        for ( Option option : optionList ) {
            list.add( convertModelToDTO( option ) );
        }

        return list;
    }

    @Override
    public List<OptionRespVO> convertCacheDTO2RespListVO(List<OptionDTO> optionDTOList) {
        if ( optionDTOList == null ) {
            return null;
        }

        List<OptionRespVO> list = new ArrayList<OptionRespVO>( optionDTOList.size() );
        for ( OptionDTO optionDTO : optionDTOList ) {
            list.add( optionDTOToOptionRespVO( optionDTO ) );
        }

        return list;
    }

    @Override
    public OptionDTO convertModelToDTO(Option option) {
        if ( option == null ) {
            return null;
        }

        OptionDTO optionDTO = new OptionDTO();

        optionDTO.setId( option.getId() );
        optionDTO.setKey( option.getKey() );
        optionDTO.setValue( option.getValue() );
        optionDTO.setTitle( option.getTitle() );
        optionDTO.setIdentification( option.getIdentification() );

        return optionDTO;
    }

    @Override
    public Option convertByAddReqVO(OptionAddReqVO optionAddReqVO) {
        if ( optionAddReqVO == null ) {
            return null;
        }

        Option option = new Option();

        option.setKey( optionAddReqVO.getKey() );
        option.setTitle( optionAddReqVO.getTitle() );
        option.setValue( optionAddReqVO.getValue() );
        option.setIdentification( optionAddReqVO.getIdentification() );

        return option;
    }

    @Override
    public List<OptionRespVO> convertToRespVOList(List<Option> optionList) {
        if ( optionList == null ) {
            return null;
        }

        List<OptionRespVO> list = new ArrayList<OptionRespVO>( optionList.size() );
        for ( Option option : optionList ) {
            list.add( optionToOptionRespVO( option ) );
        }

        return list;
    }

    @Override
    public List<Option> convertModelListByAddList(List<OptionAddReqVO> options) {
        if ( options == null ) {
            return null;
        }

        List<Option> list = new ArrayList<Option>( options.size() );
        for ( OptionAddReqVO optionAddReqVO : options ) {
            list.add( convertByAddReqVO( optionAddReqVO ) );
        }

        return list;
    }

    protected OptionRespVO optionDTOToOptionRespVO(OptionDTO optionDTO) {
        if ( optionDTO == null ) {
            return null;
        }

        OptionRespVO optionRespVO = new OptionRespVO();

        optionRespVO.setKey( optionDTO.getKey() );
        optionRespVO.setValue( optionDTO.getValue() );
        optionRespVO.setTitle( optionDTO.getTitle() );
        optionRespVO.setIdentification( optionDTO.getIdentification() );
        optionRespVO.setId( optionDTO.getId() );

        return optionRespVO;
    }

    protected OptionRespVO optionToOptionRespVO(Option option) {
        if ( option == null ) {
            return null;
        }

        OptionRespVO optionRespVO = new OptionRespVO();

        optionRespVO.setKey( option.getKey() );
        optionRespVO.setValue( option.getValue() );
        optionRespVO.setTitle( option.getTitle() );
        optionRespVO.setIdentification( option.getIdentification() );
        optionRespVO.setId( option.getId() );

        return optionRespVO;
    }
}
