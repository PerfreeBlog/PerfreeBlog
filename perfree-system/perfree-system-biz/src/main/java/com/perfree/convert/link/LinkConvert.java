package com.perfree.convert.link;


import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.link.vo.LinkAddReqVO;
import com.perfree.controller.auth.link.vo.LinkRespVO;
import com.perfree.controller.auth.link.vo.LinkUpdateReqVO;
import com.perfree.model.Link;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LinkConvert {
    LinkConvert INSTANCE = Mappers.getMapper(LinkConvert.class);


    PageResult<LinkRespVO> convertPageResultVO(PageResult<Link> linkPageResult);

    LinkRespVO convertRespVO(Link link);

    Link convertAddReqVOToModel(LinkAddReqVO linkAddReqVO);

    Link convertUpdateReqVOToModel(LinkUpdateReqVO linkUpdateReqVO);

}
