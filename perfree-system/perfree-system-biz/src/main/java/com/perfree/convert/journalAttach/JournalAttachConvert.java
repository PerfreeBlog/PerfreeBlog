package com.perfree.convert.journalAttach;


import com.perfree.controller.auth.journal.vo.JournalAttachAddReqVO;
import com.perfree.controller.auth.journal.vo.JournalAttachRespVO;
import com.perfree.model.JournalAttach;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface JournalAttachConvert {
    JournalAttachConvert INSTANCE = Mappers.getMapper(JournalAttachConvert.class);

    List<JournalAttach> convertAddReqList(List<JournalAttachAddReqVO> attachList);

    List<JournalAttachRespVO> convertToRespVOList(List<JournalAttach> journalAttachList);

}
