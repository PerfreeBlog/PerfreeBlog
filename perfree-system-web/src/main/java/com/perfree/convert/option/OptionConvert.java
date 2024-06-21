package com.perfree.convert.option;


import com.perfree.model.Option;
import com.perfree.controller.auth.option.vo.OptionRespVO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.perfree.system.api.option.dto.OptionCacheDTO;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OptionConvert {
    OptionConvert INSTANCE = Mappers.getMapper(OptionConvert.class);

    List<OptionCacheDTO> convertCacheDTO(List<Option> optionList);

    List<OptionRespVO> convertCacheDTO2RespListVO(List<OptionCacheDTO> optionCacheDTOList);
}
