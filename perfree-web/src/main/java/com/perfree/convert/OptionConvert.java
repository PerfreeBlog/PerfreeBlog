package com.perfree.convert;

import com.perfree.model.Option;
import com.perfree.controller.api.option.vo.OptionBaseVO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OptionConvert {
    OptionConvert INSTANCE = Mappers.getMapper(OptionConvert.class);

    Option convertBaseVoToModel(OptionBaseVO optionBaseVO);

}
