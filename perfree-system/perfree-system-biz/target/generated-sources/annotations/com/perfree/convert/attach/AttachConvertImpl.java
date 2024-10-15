package com.perfree.convert.attach;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attach.vo.AttachByUrlRespVO;
import com.perfree.controller.auth.attach.vo.AttachGroupRespVO;
import com.perfree.controller.auth.attach.vo.AttachRespVO;
import com.perfree.controller.auth.attach.vo.AttachUpdateVO;
import com.perfree.controller.auth.attach.vo.AttachUploadVO;
import com.perfree.model.Attach;
import com.perfree.system.api.attach.dto.AttachFileDTO;
import com.perfree.system.api.attach.dto.AttachUploadDTO;
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
public class AttachConvertImpl implements AttachConvert {

    @Override
    public PageResult<AttachRespVO> convertPageResultVO(PageResult<Attach> rolePageResult) {
        if ( rolePageResult == null ) {
            return null;
        }

        PageResult<AttachRespVO> pageResult = new PageResult<AttachRespVO>();

        pageResult.setList( attachListToAttachRespVOList( rolePageResult.getList() ) );
        pageResult.setTotal( rolePageResult.getTotal() );

        return pageResult;
    }

    @Override
    public AttachUploadDTO convertAttachUploadDTO(AttachUploadVO attachUploadVO) {
        if ( attachUploadVO == null ) {
            return null;
        }

        AttachUploadDTO attachUploadDTO = new AttachUploadDTO();

        attachUploadDTO.setFile( attachUploadVO.getFile() );
        attachUploadDTO.setAttachGroup( attachUploadVO.getAttachGroup() );
        attachUploadDTO.setName( attachUploadVO.getName() );

        return attachUploadDTO;
    }

    @Override
    public Attach convertAttachFileDTO(AttachFileDTO upload) {
        if ( upload == null ) {
            return null;
        }

        Attach attach = new Attach();

        attach.setName( upload.getName() );
        attach.setPath( upload.getPath() );
        attach.setFlag( upload.getFlag() );
        attach.setType( upload.getType() );
        attach.setMineType( upload.getMineType() );
        attach.setConfigId( upload.getConfigId() );
        attach.setUrl( upload.getUrl() );
        attach.setStorage( upload.getStorage() );
        attach.setAttachGroup( upload.getAttachGroup() );

        return attach;
    }

    @Override
    public AttachRespVO convertRespVO(Attach attach) {
        if ( attach == null ) {
            return null;
        }

        AttachRespVO attachRespVO = new AttachRespVO();

        attachRespVO.setName( attach.getName() );
        attachRespVO.setRemark( attach.getRemark() );
        attachRespVO.setPath( attach.getPath() );
        if ( attach.getConfigId() != null ) {
            attachRespVO.setConfigId( String.valueOf( attach.getConfigId() ) );
        }
        attachRespVO.setUrl( attach.getUrl() );
        attachRespVO.setFlag( attach.getFlag() );
        attachRespVO.setType( attach.getType() );
        attachRespVO.setMineType( attach.getMineType() );
        attachRespVO.setStorage( attach.getStorage() );
        attachRespVO.setAttachGroup( attach.getAttachGroup() );
        attachRespVO.setId( attach.getId() );
        attachRespVO.setCreateTime( attach.getCreateTime() );
        attachRespVO.setUpdateTime( attach.getUpdateTime() );

        return attachRespVO;
    }

    @Override
    public AttachFileDTO convertToAttachFileDTO(Attach attach) {
        if ( attach == null ) {
            return null;
        }

        AttachFileDTO attachFileDTO = new AttachFileDTO();

        attachFileDTO.setName( attach.getName() );
        attachFileDTO.setPath( attach.getPath() );
        attachFileDTO.setFlag( attach.getFlag() );
        attachFileDTO.setType( attach.getType() );
        attachFileDTO.setMineType( attach.getMineType() );
        attachFileDTO.setConfigId( attach.getConfigId() );
        attachFileDTO.setUrl( attach.getUrl() );
        attachFileDTO.setAttachGroup( attach.getAttachGroup() );
        attachFileDTO.setStorage( attach.getStorage() );

        return attachFileDTO;
    }

    @Override
    public List<AttachGroupRespVO> convertGroupRespVO(List<Attach> attachList) {
        if ( attachList == null ) {
            return null;
        }

        List<AttachGroupRespVO> list = new ArrayList<AttachGroupRespVO>( attachList.size() );
        for ( Attach attach : attachList ) {
            list.add( attachToAttachGroupRespVO( attach ) );
        }

        return list;
    }

    @Override
    public Attach convertByUpdateVO(AttachUpdateVO attachUpdateVO) {
        if ( attachUpdateVO == null ) {
            return null;
        }

        Attach attach = new Attach();

        attach.setId( attachUpdateVO.getId() );
        attach.setName( attachUpdateVO.getName() );
        attach.setRemark( attachUpdateVO.getRemark() );
        attach.setAttachGroup( attachUpdateVO.getAttachGroup() );

        return attach;
    }

    @Override
    public AttachByUrlRespVO convertByUrlRespVO(Attach attach) {
        if ( attach == null ) {
            return null;
        }

        AttachByUrlRespVO attachByUrlRespVO = new AttachByUrlRespVO();

        attachByUrlRespVO.setName( attach.getName() );
        attachByUrlRespVO.setRemark( attach.getRemark() );
        attachByUrlRespVO.setPath( attach.getPath() );
        if ( attach.getConfigId() != null ) {
            attachByUrlRespVO.setConfigId( String.valueOf( attach.getConfigId() ) );
        }
        attachByUrlRespVO.setUrl( attach.getUrl() );
        attachByUrlRespVO.setFlag( attach.getFlag() );
        attachByUrlRespVO.setType( attach.getType() );
        attachByUrlRespVO.setMineType( attach.getMineType() );
        attachByUrlRespVO.setStorage( attach.getStorage() );
        attachByUrlRespVO.setAttachGroup( attach.getAttachGroup() );
        attachByUrlRespVO.setId( attach.getId() );
        attachByUrlRespVO.setCreateTime( attach.getCreateTime() );
        attachByUrlRespVO.setUpdateTime( attach.getUpdateTime() );

        return attachByUrlRespVO;
    }

    protected List<AttachRespVO> attachListToAttachRespVOList(List<Attach> list) {
        if ( list == null ) {
            return null;
        }

        List<AttachRespVO> list1 = new ArrayList<AttachRespVO>( list.size() );
        for ( Attach attach : list ) {
            list1.add( convertRespVO( attach ) );
        }

        return list1;
    }

    protected AttachGroupRespVO attachToAttachGroupRespVO(Attach attach) {
        if ( attach == null ) {
            return null;
        }

        AttachGroupRespVO attachGroupRespVO = new AttachGroupRespVO();

        attachGroupRespVO.setAttachGroup( attach.getAttachGroup() );

        return attachGroupRespVO;
    }
}
