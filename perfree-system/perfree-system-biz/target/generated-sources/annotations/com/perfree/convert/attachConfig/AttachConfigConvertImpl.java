package com.perfree.convert.attachConfig;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigCreateVO;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigRespVO;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigUpdateVO;
import com.perfree.model.AttachConfig;
import com.perfree.system.api.attachConfig.dto.AttachConfigCacheDTO;
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
public class AttachConfigConvertImpl implements AttachConfigConvert {

    @Override
    public List<AttachConfigRespVO> convertRespListVO(List<AttachConfig> attachConfigList) {
        if ( attachConfigList == null ) {
            return null;
        }

        List<AttachConfigRespVO> list = new ArrayList<AttachConfigRespVO>( attachConfigList.size() );
        for ( AttachConfig attachConfig : attachConfigList ) {
            list.add( convertRespVO( attachConfig ) );
        }

        return list;
    }

    @Override
    public AttachConfigRespVO convertRespVO(AttachConfig attachConfig) {
        if ( attachConfig == null ) {
            return null;
        }

        AttachConfigRespVO attachConfigRespVO = new AttachConfigRespVO();

        attachConfigRespVO.setName( attachConfig.getName() );
        attachConfigRespVO.setStorage( attachConfig.getStorage() );
        attachConfigRespVO.setRemark( attachConfig.getRemark() );
        attachConfigRespVO.setMaster( attachConfig.getMaster() );
        attachConfigRespVO.setConfig( attachConfig.getConfig() );
        attachConfigRespVO.setId( attachConfig.getId() );
        attachConfigRespVO.setCreateTime( attachConfig.getCreateTime() );
        attachConfigRespVO.setUpdateTime( attachConfig.getUpdateTime() );

        return attachConfigRespVO;
    }

    @Override
    public AttachConfig convertCreateVO(AttachConfigCreateVO attachConfigCreateVO) {
        if ( attachConfigCreateVO == null ) {
            return null;
        }

        AttachConfig attachConfig = new AttachConfig();

        attachConfig.setName( attachConfigCreateVO.getName() );
        attachConfig.setStorage( attachConfigCreateVO.getStorage() );
        attachConfig.setRemark( attachConfigCreateVO.getRemark() );
        attachConfig.setConfig( attachConfigCreateVO.getConfig() );
        attachConfig.setMaster( attachConfigCreateVO.getMaster() );

        return attachConfig;
    }

    @Override
    public AttachConfig convertUpdateVO(AttachConfigUpdateVO attachConfigUpdateVO) {
        if ( attachConfigUpdateVO == null ) {
            return null;
        }

        AttachConfig attachConfig = new AttachConfig();

        attachConfig.setId( attachConfigUpdateVO.getId() );
        attachConfig.setName( attachConfigUpdateVO.getName() );
        attachConfig.setStorage( attachConfigUpdateVO.getStorage() );
        attachConfig.setRemark( attachConfigUpdateVO.getRemark() );
        attachConfig.setConfig( attachConfigUpdateVO.getConfig() );
        attachConfig.setMaster( attachConfigUpdateVO.getMaster() );

        return attachConfig;
    }

    @Override
    public PageResult<AttachConfigRespVO> convertPageResultVO(PageResult<AttachConfig> attachPage) {
        if ( attachPage == null ) {
            return null;
        }

        PageResult<AttachConfigRespVO> pageResult = new PageResult<AttachConfigRespVO>();

        pageResult.setList( convertRespListVO( attachPage.getList() ) );
        pageResult.setTotal( attachPage.getTotal() );

        return pageResult;
    }

    @Override
    public List<AttachConfigCacheDTO> convertCacheListDTO(List<AttachConfig> all) {
        if ( all == null ) {
            return null;
        }

        List<AttachConfigCacheDTO> list = new ArrayList<AttachConfigCacheDTO>( all.size() );
        for ( AttachConfig attachConfig : all ) {
            list.add( convertCacheDTO( attachConfig ) );
        }

        return list;
    }

    @Override
    public AttachConfigCacheDTO convertCacheDTO(AttachConfig attachConfig) {
        if ( attachConfig == null ) {
            return null;
        }

        AttachConfigCacheDTO attachConfigCacheDTO = new AttachConfigCacheDTO();

        attachConfigCacheDTO.setId( attachConfig.getId() );
        attachConfigCacheDTO.setName( attachConfig.getName() );
        attachConfigCacheDTO.setStorage( attachConfig.getStorage() );
        attachConfigCacheDTO.setRemark( attachConfig.getRemark() );
        attachConfigCacheDTO.setConfig( attachConfig.getConfig() );
        attachConfigCacheDTO.setMaster( attachConfig.getMaster() );

        return attachConfigCacheDTO;
    }
}
