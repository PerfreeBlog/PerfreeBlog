package com.perfree.convert;

import com.perfree.controller.api.option.vo.OptionRespVO;
import com.perfree.model.Option;
import com.perfree.controller.api.option.vo.OptionBaseVO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OptionConvert {
    OptionConvert INSTANCE = Mappers.getMapper(OptionConvert.class);

    Option convertBaseVoToModel(OptionBaseVO optionBaseVO);

    List<OptionRespVO> convertRespVOList(List<Option> optionList);

}
