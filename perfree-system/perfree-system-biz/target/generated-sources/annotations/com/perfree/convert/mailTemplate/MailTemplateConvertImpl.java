package com.perfree.convert.mailTemplate;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailTemplate.vo.MailTemplateAddReqVO;
import com.perfree.controller.auth.mailTemplate.vo.MailTemplateExcelVO;
import com.perfree.controller.auth.mailTemplate.vo.MailTemplateRespVO;
import com.perfree.controller.auth.mailTemplate.vo.MailTemplateUpdateReqVO;
import com.perfree.model.MailTemplate;
import com.perfree.system.api.mailTemplate.dto.MailTemplateDTO;
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
public class MailTemplateConvertImpl implements MailTemplateConvert {

    @Override
    public MailTemplateRespVO convertRespVO(MailTemplate mailTemplate) {
        if ( mailTemplate == null ) {
            return null;
        }

        MailTemplateRespVO mailTemplateRespVO = new MailTemplateRespVO();

        mailTemplateRespVO.setName( mailTemplate.getName() );
        mailTemplateRespVO.setCode( mailTemplate.getCode() );
        mailTemplateRespVO.setMailServerId( mailTemplate.getMailServerId() );
        mailTemplateRespVO.setNickname( mailTemplate.getNickname() );
        mailTemplateRespVO.setMailTitle( mailTemplate.getMailTitle() );
        mailTemplateRespVO.setMailContent( mailTemplate.getMailContent() );
        mailTemplateRespVO.setStatus( mailTemplate.getStatus() );
        mailTemplateRespVO.setRemark( mailTemplate.getRemark() );
        mailTemplateRespVO.setId( mailTemplate.getId() );
        mailTemplateRespVO.setCreateTime( mailTemplate.getCreateTime() );
        List<String> list = mailTemplate.getMailParams();
        if ( list != null ) {
            mailTemplateRespVO.setMailParams( new ArrayList<String>( list ) );
        }

        return mailTemplateRespVO;
    }

    @Override
    public PageResult<MailTemplateRespVO> convertPageResultVO(PageResult<MailTemplate> mailTemplatePageResult) {
        if ( mailTemplatePageResult == null ) {
            return null;
        }

        PageResult<MailTemplateRespVO> pageResult = new PageResult<MailTemplateRespVO>();

        pageResult.setList( convertListRespVO( mailTemplatePageResult.getList() ) );
        pageResult.setTotal( mailTemplatePageResult.getTotal() );

        return pageResult;
    }

    @Override
    public MailTemplate convertAddReqVO(MailTemplateAddReqVO mailTemplateAddReqVO) {
        if ( mailTemplateAddReqVO == null ) {
            return null;
        }

        MailTemplate mailTemplate = new MailTemplate();

        mailTemplate.setName( mailTemplateAddReqVO.getName() );
        mailTemplate.setCode( mailTemplateAddReqVO.getCode() );
        mailTemplate.setMailServerId( mailTemplateAddReqVO.getMailServerId() );
        mailTemplate.setNickname( mailTemplateAddReqVO.getNickname() );
        mailTemplate.setMailTitle( mailTemplateAddReqVO.getMailTitle() );
        mailTemplate.setMailContent( mailTemplateAddReqVO.getMailContent() );
        mailTemplate.setStatus( mailTemplateAddReqVO.getStatus() );
        mailTemplate.setRemark( mailTemplateAddReqVO.getRemark() );

        return mailTemplate;
    }

    @Override
    public MailTemplate convertUpdateReqVO(MailTemplateUpdateReqVO mailTemplateUpdateReqVO) {
        if ( mailTemplateUpdateReqVO == null ) {
            return null;
        }

        MailTemplate mailTemplate = new MailTemplate();

        mailTemplate.setId( mailTemplateUpdateReqVO.getId() );
        mailTemplate.setName( mailTemplateUpdateReqVO.getName() );
        mailTemplate.setCode( mailTemplateUpdateReqVO.getCode() );
        mailTemplate.setMailServerId( mailTemplateUpdateReqVO.getMailServerId() );
        mailTemplate.setNickname( mailTemplateUpdateReqVO.getNickname() );
        mailTemplate.setMailTitle( mailTemplateUpdateReqVO.getMailTitle() );
        mailTemplate.setMailContent( mailTemplateUpdateReqVO.getMailContent() );
        mailTemplate.setStatus( mailTemplateUpdateReqVO.getStatus() );
        mailTemplate.setRemark( mailTemplateUpdateReqVO.getRemark() );

        return mailTemplate;
    }

    @Override
    public List<MailTemplateRespVO> convertListRespVO(List<MailTemplate> list) {
        if ( list == null ) {
            return null;
        }

        List<MailTemplateRespVO> list1 = new ArrayList<MailTemplateRespVO>( list.size() );
        for ( MailTemplate mailTemplate : list ) {
            list1.add( convertRespVO( mailTemplate ) );
        }

        return list1;
    }

    @Override
    public List<MailTemplateExcelVO> convertToExcelVOList(List<MailTemplate> list) {
        if ( list == null ) {
            return null;
        }

        List<MailTemplateExcelVO> list1 = new ArrayList<MailTemplateExcelVO>( list.size() );
        for ( MailTemplate mailTemplate : list ) {
            list1.add( mailTemplateToMailTemplateExcelVO( mailTemplate ) );
        }

        return list1;
    }

    @Override
    public MailTemplateDTO convertToDTO(MailTemplate byId) {
        if ( byId == null ) {
            return null;
        }

        MailTemplateDTO.MailTemplateDTOBuilder mailTemplateDTO = MailTemplateDTO.builder();

        mailTemplateDTO.id( byId.getId() );
        mailTemplateDTO.name( byId.getName() );
        mailTemplateDTO.code( byId.getCode() );
        mailTemplateDTO.mailServerId( byId.getMailServerId() );
        mailTemplateDTO.nickname( byId.getNickname() );
        mailTemplateDTO.mailTitle( byId.getMailTitle() );
        mailTemplateDTO.mailContent( byId.getMailContent() );
        mailTemplateDTO.status( byId.getStatus() );
        mailTemplateDTO.remark( byId.getRemark() );
        List<String> list = byId.getMailParams();
        if ( list != null ) {
            mailTemplateDTO.mailParams( new ArrayList<String>( list ) );
        }

        return mailTemplateDTO.build();
    }

    protected MailTemplateExcelVO mailTemplateToMailTemplateExcelVO(MailTemplate mailTemplate) {
        if ( mailTemplate == null ) {
            return null;
        }

        MailTemplateExcelVO mailTemplateExcelVO = new MailTemplateExcelVO();

        mailTemplateExcelVO.setName( mailTemplate.getName() );
        mailTemplateExcelVO.setCode( mailTemplate.getCode() );
        mailTemplateExcelVO.setNickname( mailTemplate.getNickname() );
        mailTemplateExcelVO.setMailTitle( mailTemplate.getMailTitle() );
        mailTemplateExcelVO.setMailContent( mailTemplate.getMailContent() );
        mailTemplateExcelVO.setStatus( mailTemplate.getStatus() );
        mailTemplateExcelVO.setRemark( mailTemplate.getRemark() );
        mailTemplateExcelVO.setCreateTime( mailTemplate.getCreateTime() );

        return mailTemplateExcelVO;
    }
}
