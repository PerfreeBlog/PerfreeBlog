package com.perfree.convert.tag;


import com.perfree.controller.auth.tag.vo.TagCreateReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.controller.auth.tag.vo.TagUpdateReqVO;
import com.perfree.model.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagConvert {
    TagConvert INSTANCE = Mappers.getMapper(TagConvert.class);

    TagRespVO convertRespVO(Tag tag);

    Tag convertCreateReqVoToModel(TagCreateReqVO tagCreateReqVO);

    Tag convertUpdateReqVoToModel(TagUpdateReqVO tagUpdateReqVO);

    List<TagRespVO> convertRespVOList(List<Tag> list);

}
