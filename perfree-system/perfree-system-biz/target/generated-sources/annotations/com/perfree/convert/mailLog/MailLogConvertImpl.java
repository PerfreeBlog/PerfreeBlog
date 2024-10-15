package com.perfree.convert.mailLog;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailLog.vo.MailLogAddReqVO;
import com.perfree.controller.auth.mailLog.vo.MailLogExcelVO;
import com.perfree.controller.auth.mailLog.vo.MailLogRespVO;
import com.perfree.controller.auth.mailLog.vo.MailLogUpdateReqVO;
import com.perfree.model.MailLog;
import com.perfree.system.api.mailLog.dto.MailLogDTO;
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
public class MailLogConvertImpl implements MailLogConvert {

    @Override
    public MailLogRespVO convertRespVO(MailLog mailLog) {
        if ( mailLog == null ) {
            return null;
        }

        MailLogRespVO mailLogRespVO = new MailLogRespVO();

        mailLogRespVO.setMailTemplateCode( mailLog.getMailTemplateCode() );
        mailLogRespVO.setSendDate( mailLog.getSendDate() );
        mailLogRespVO.setReceiveMail( mailLog.getReceiveMail() );
        mailLogRespVO.setMailTitle( mailLog.getMailTitle() );
        mailLogRespVO.setSendStatus( mailLog.getSendStatus() );
        mailLogRespVO.setSendMail( mailLog.getSendMail() );
        mailLogRespVO.setContent( mailLog.getContent() );
        mailLogRespVO.setId( mailLog.getId() );
        mailLogRespVO.setCreateTime( mailLog.getCreateTime() );

        return mailLogRespVO;
    }

    @Override
    public PageResult<MailLogRespVO> convertPageResultVO(PageResult<MailLog> mailLogPageResult) {
        if ( mailLogPageResult == null ) {
            return null;
        }

        PageResult<MailLogRespVO> pageResult = new PageResult<MailLogRespVO>();

        pageResult.setList( convertListRespVO( mailLogPageResult.getList() ) );
        pageResult.setTotal( mailLogPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public MailLog convertAddReqVO(MailLogAddReqVO mailLogAddReqVO) {
        if ( mailLogAddReqVO == null ) {
            return null;
        }

        MailLog mailLog = new MailLog();

        mailLog.setMailTemplateCode( mailLogAddReqVO.getMailTemplateCode() );
        mailLog.setSendDate( mailLogAddReqVO.getSendDate() );
        mailLog.setReceiveMail( mailLogAddReqVO.getReceiveMail() );
        mailLog.setMailTitle( mailLogAddReqVO.getMailTitle() );
        mailLog.setSendStatus( mailLogAddReqVO.getSendStatus() );
        mailLog.setSendMail( mailLogAddReqVO.getSendMail() );
        mailLog.setContent( mailLogAddReqVO.getContent() );

        return mailLog;
    }

    @Override
    public MailLog convertUpdateReqVO(MailLogUpdateReqVO mailLogUpdateReqVO) {
        if ( mailLogUpdateReqVO == null ) {
            return null;
        }

        MailLog mailLog = new MailLog();

        mailLog.setId( mailLogUpdateReqVO.getId() );
        mailLog.setMailTemplateCode( mailLogUpdateReqVO.getMailTemplateCode() );
        mailLog.setSendDate( mailLogUpdateReqVO.getSendDate() );
        mailLog.setReceiveMail( mailLogUpdateReqVO.getReceiveMail() );
        mailLog.setMailTitle( mailLogUpdateReqVO.getMailTitle() );
        mailLog.setSendStatus( mailLogUpdateReqVO.getSendStatus() );
        mailLog.setSendMail( mailLogUpdateReqVO.getSendMail() );
        mailLog.setContent( mailLogUpdateReqVO.getContent() );

        return mailLog;
    }

    @Override
    public List<MailLogRespVO> convertListRespVO(List<MailLog> list) {
        if ( list == null ) {
            return null;
        }

        List<MailLogRespVO> list1 = new ArrayList<MailLogRespVO>( list.size() );
        for ( MailLog mailLog : list ) {
            list1.add( convertRespVO( mailLog ) );
        }

        return list1;
    }

    @Override
    public List<MailLogExcelVO> convertToExcelVOList(List<MailLog> list) {
        if ( list == null ) {
            return null;
        }

        List<MailLogExcelVO> list1 = new ArrayList<MailLogExcelVO>( list.size() );
        for ( MailLog mailLog : list ) {
            list1.add( mailLogToMailLogExcelVO( mailLog ) );
        }

        return list1;
    }

    @Override
    public MailLog convertByDTO(MailLogDTO mailLogDTO) {
        if ( mailLogDTO == null ) {
            return null;
        }

        MailLog mailLog = new MailLog();

        mailLog.setId( mailLogDTO.getId() );
        mailLog.setMailTemplateCode( mailLogDTO.getMailTemplateCode() );
        mailLog.setSendDate( mailLogDTO.getSendDate() );
        mailLog.setReceiveMail( mailLogDTO.getReceiveMail() );
        mailLog.setMailTitle( mailLogDTO.getMailTitle() );
        mailLog.setSendStatus( mailLogDTO.getSendStatus() );
        mailLog.setSendMail( mailLogDTO.getSendMail() );
        mailLog.setContent( mailLogDTO.getContent() );

        return mailLog;
    }

    protected MailLogExcelVO mailLogToMailLogExcelVO(MailLog mailLog) {
        if ( mailLog == null ) {
            return null;
        }

        MailLogExcelVO mailLogExcelVO = new MailLogExcelVO();

        mailLogExcelVO.setMailTemplateCode( mailLog.getMailTemplateCode() );
        mailLogExcelVO.setSendDate( mailLog.getSendDate() );
        mailLogExcelVO.setReceiveMail( mailLog.getReceiveMail() );
        mailLogExcelVO.setMailTitle( mailLog.getMailTitle() );
        mailLogExcelVO.setSendStatus( mailLog.getSendStatus() );
        mailLogExcelVO.setSendMail( mailLog.getSendMail() );
        mailLogExcelVO.setContent( mailLog.getContent() );
        mailLogExcelVO.setCreateTime( mailLog.getCreateTime() );

        return mailLogExcelVO;
    }
}
