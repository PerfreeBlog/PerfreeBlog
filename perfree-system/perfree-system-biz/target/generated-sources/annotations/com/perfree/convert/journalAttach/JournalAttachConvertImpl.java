package com.perfree.convert.journalAttach;

import com.perfree.controller.auth.journal.vo.JournalAttachAddReqVO;
import com.perfree.controller.auth.journal.vo.JournalAttachRespVO;
import com.perfree.model.JournalAttach;
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
public class JournalAttachConvertImpl implements JournalAttachConvert {

    @Override
    public List<JournalAttach> convertAddReqList(List<JournalAttachAddReqVO> attachList) {
        if ( attachList == null ) {
            return null;
        }

        List<JournalAttach> list = new ArrayList<JournalAttach>( attachList.size() );
        for ( JournalAttachAddReqVO journalAttachAddReqVO : attachList ) {
            list.add( journalAttachAddReqVOToJournalAttach( journalAttachAddReqVO ) );
        }

        return list;
    }

    @Override
    public List<JournalAttachRespVO> convertToRespVOList(List<JournalAttach> journalAttachList) {
        if ( journalAttachList == null ) {
            return null;
        }

        List<JournalAttachRespVO> list = new ArrayList<JournalAttachRespVO>( journalAttachList.size() );
        for ( JournalAttach journalAttach : journalAttachList ) {
            list.add( journalAttachToJournalAttachRespVO( journalAttach ) );
        }

        return list;
    }

    protected JournalAttach journalAttachAddReqVOToJournalAttach(JournalAttachAddReqVO journalAttachAddReqVO) {
        if ( journalAttachAddReqVO == null ) {
            return null;
        }

        JournalAttach journalAttach = new JournalAttach();

        journalAttach.setAttachId( journalAttachAddReqVO.getAttachId() );
        journalAttach.setUrl( journalAttachAddReqVO.getUrl() );
        journalAttach.setType( journalAttachAddReqVO.getType() );
        journalAttach.setMineType( journalAttachAddReqVO.getMineType() );
        journalAttach.setName( journalAttachAddReqVO.getName() );

        return journalAttach;
    }

    protected JournalAttachRespVO journalAttachToJournalAttachRespVO(JournalAttach journalAttach) {
        if ( journalAttach == null ) {
            return null;
        }

        JournalAttachRespVO journalAttachRespVO = new JournalAttachRespVO();

        journalAttachRespVO.setId( journalAttach.getId() );
        journalAttachRespVO.setAttachId( journalAttach.getAttachId() );
        journalAttachRespVO.setUrl( journalAttach.getUrl() );
        journalAttachRespVO.setType( journalAttach.getType() );
        journalAttachRespVO.setMineType( journalAttach.getMineType() );
        journalAttachRespVO.setName( journalAttach.getName() );

        return journalAttachRespVO;
    }
}
