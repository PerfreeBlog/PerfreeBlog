package com.perfree.convert.mailServer;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailServer.vo.MailServerAddReqVO;
import com.perfree.controller.auth.mailServer.vo.MailServerExcelVO;
import com.perfree.controller.auth.mailServer.vo.MailServerRespVO;
import com.perfree.controller.auth.mailServer.vo.MailServerUpdateReqVO;
import com.perfree.model.MailServer;
import com.perfree.system.api.mailServer.dto.MailServerDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:51:00+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class MailServerConvertImpl implements MailServerConvert {

    @Override
    public MailServerRespVO convertRespVO(MailServer mailServer) {
        if ( mailServer == null ) {
            return null;
        }

        MailServerRespVO mailServerRespVO = new MailServerRespVO();

        mailServerRespVO.setName( mailServer.getName() );
        mailServerRespVO.setAccount( mailServer.getAccount() );
        mailServerRespVO.setUserName( mailServer.getUserName() );
        mailServerRespVO.setPassword( mailServer.getPassword() );
        mailServerRespVO.setAddress( mailServer.getAddress() );
        mailServerRespVO.setPort( mailServer.getPort() );
        mailServerRespVO.setStatus( mailServer.getStatus() );
        mailServerRespVO.setEnableSSL( mailServer.getEnableSSL() );
        mailServerRespVO.setId( mailServer.getId() );
        mailServerRespVO.setCreateTime( mailServer.getCreateTime() );

        return mailServerRespVO;
    }

    @Override
    public PageResult<MailServerRespVO> convertPageResultVO(PageResult<MailServer> mailServerPageResult) {
        if ( mailServerPageResult == null ) {
            return null;
        }

        PageResult<MailServerRespVO> pageResult = new PageResult<MailServerRespVO>();

        pageResult.setList( convertListRespVO( mailServerPageResult.getList() ) );
        pageResult.setTotal( mailServerPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public MailServer convertAddReqVO(MailServerAddReqVO mailServerAddReqVO) {
        if ( mailServerAddReqVO == null ) {
            return null;
        }

        MailServer mailServer = new MailServer();

        mailServer.setName( mailServerAddReqVO.getName() );
        mailServer.setAccount( mailServerAddReqVO.getAccount() );
        mailServer.setUserName( mailServerAddReqVO.getUserName() );
        mailServer.setAddress( mailServerAddReqVO.getAddress() );
        mailServer.setPassword( mailServerAddReqVO.getPassword() );
        mailServer.setPort( mailServerAddReqVO.getPort() );
        mailServer.setStatus( mailServerAddReqVO.getStatus() );
        mailServer.setEnableSSL( mailServerAddReqVO.getEnableSSL() );

        return mailServer;
    }

    @Override
    public MailServer convertUpdateReqVO(MailServerUpdateReqVO mailServerUpdateReqVO) {
        if ( mailServerUpdateReqVO == null ) {
            return null;
        }

        MailServer mailServer = new MailServer();

        mailServer.setId( mailServerUpdateReqVO.getId() );
        mailServer.setName( mailServerUpdateReqVO.getName() );
        mailServer.setAccount( mailServerUpdateReqVO.getAccount() );
        mailServer.setUserName( mailServerUpdateReqVO.getUserName() );
        mailServer.setAddress( mailServerUpdateReqVO.getAddress() );
        mailServer.setPassword( mailServerUpdateReqVO.getPassword() );
        mailServer.setPort( mailServerUpdateReqVO.getPort() );
        mailServer.setStatus( mailServerUpdateReqVO.getStatus() );
        mailServer.setEnableSSL( mailServerUpdateReqVO.getEnableSSL() );

        return mailServer;
    }

    @Override
    public List<MailServerRespVO> convertListRespVO(List<MailServer> list) {
        if ( list == null ) {
            return null;
        }

        List<MailServerRespVO> list1 = new ArrayList<MailServerRespVO>( list.size() );
        for ( MailServer mailServer : list ) {
            list1.add( convertRespVO( mailServer ) );
        }

        return list1;
    }

    @Override
    public List<MailServerExcelVO> convertToExcelVOList(List<MailServer> list) {
        if ( list == null ) {
            return null;
        }

        List<MailServerExcelVO> list1 = new ArrayList<MailServerExcelVO>( list.size() );
        for ( MailServer mailServer : list ) {
            list1.add( mailServerToMailServerExcelVO( mailServer ) );
        }

        return list1;
    }

    @Override
    public MailServerDTO convertToDTO(MailServer byId) {
        if ( byId == null ) {
            return null;
        }

        MailServerDTO.MailServerDTOBuilder mailServerDTO = MailServerDTO.builder();

        mailServerDTO.id( byId.getId() );
        mailServerDTO.name( byId.getName() );
        mailServerDTO.account( byId.getAccount() );
        mailServerDTO.userName( byId.getUserName() );
        mailServerDTO.password( byId.getPassword() );
        mailServerDTO.address( byId.getAddress() );
        mailServerDTO.port( byId.getPort() );
        mailServerDTO.status( byId.getStatus() );
        mailServerDTO.enableSSL( byId.getEnableSSL() );

        return mailServerDTO.build();
    }

    protected MailServerExcelVO mailServerToMailServerExcelVO(MailServer mailServer) {
        if ( mailServer == null ) {
            return null;
        }

        MailServerExcelVO mailServerExcelVO = new MailServerExcelVO();

        mailServerExcelVO.setName( mailServer.getName() );
        mailServerExcelVO.setAccount( mailServer.getAccount() );
        mailServerExcelVO.setUserName( mailServer.getUserName() );
        mailServerExcelVO.setAddress( mailServer.getAddress() );
        mailServerExcelVO.setPort( mailServer.getPort() );
        mailServerExcelVO.setStatus( mailServer.getStatus() );
        mailServerExcelVO.setEnableSSL( mailServer.getEnableSSL() );
        mailServerExcelVO.setCreateTime( mailServer.getCreateTime() );

        return mailServerExcelVO;
    }
}
