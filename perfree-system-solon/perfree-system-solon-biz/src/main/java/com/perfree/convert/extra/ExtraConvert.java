package com.perfree.convert.extra;


import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.extra.vo.ExtraAddReqVO;
import com.perfree.controller.auth.extra.vo.ExtraRespVO;
import com.perfree.controller.auth.extra.vo.ExtraUpdateReqVO;
import com.perfree.model.Extra;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExtraConvert {
    ExtraConvert INSTANCE = Mappers.getMapper(ExtraConvert.class);


    ExtraRespVO convertRespVO(Extra byKey);

    PageResult<ExtraRespVO> convertPageResultVO(PageResult<Extra> extraPageResult);

    Extra convertByAddReqVO(ExtraAddReqVO extraAddReqVO);

    Extra convertByUpdateReqVO(ExtraUpdateReqVO extraUpdateReqVO);

    List<ExtraRespVO> convertListRespVO(List<Extra> extraList);

}

