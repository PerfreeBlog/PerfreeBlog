package com.perfree.convert.attach;


import com.perfree.commons.common.PageResult;
import com.perfree.system.api.attach.dto.AttachFileDTO;
import com.perfree.system.api.attach.dto.AttachUploadDTO;
import com.perfree.model.Attach;
import com.perfree.controller.attach.vo.AttachGroupRespVO;
import com.perfree.controller.attach.vo.AttachRespVO;
import com.perfree.controller.attach.vo.AttachUpdateVO;
import com.perfree.controller.attach.vo.AttachUploadVO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttachConvert {
    AttachConvert INSTANCE = Mappers.getMapper(AttachConvert.class);

    PageResult<AttachRespVO> convertPageResultVO(PageResult<Attach> rolePageResult);

    AttachUploadDTO convertAttachUploadDTO(AttachUploadVO attachUploadVO);

    Attach convertAttachFileDTO(AttachFileDTO upload);

    AttachRespVO convertRespVO(Attach attach);

    AttachFileDTO convertToAttachFileDTO(Attach attach);

    List<AttachGroupRespVO> convertGroupRespVO(List<Attach> attachList);

    Attach convertByUpdateVO(AttachUpdateVO attachUpdateVO);

}
