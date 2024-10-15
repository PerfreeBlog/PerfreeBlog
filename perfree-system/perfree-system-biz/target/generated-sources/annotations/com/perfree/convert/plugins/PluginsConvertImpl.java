package com.perfree.convert.plugins;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.plugins.vo.PluginsRespVO;
import com.perfree.model.Plugins;
import com.perfree.system.api.plugin.dto.PluginsDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:58+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class PluginsConvertImpl implements PluginsConvert {

    @Override
    public PageResult<PluginsRespVO> convertPageResultVO(PageResult<Plugins> pluginsPageResult) {
        if ( pluginsPageResult == null ) {
            return null;
        }

        PageResult<PluginsRespVO> pageResult = new PageResult<PluginsRespVO>();

        pageResult.setList( pluginsListToPluginsRespVOList( pluginsPageResult.getList() ) );
        pageResult.setTotal( pluginsPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public PluginsDTO convertToDTO(Plugins plugins) {
        if ( plugins == null ) {
            return null;
        }

        PluginsDTO pluginsDTO = new PluginsDTO();

        pluginsDTO.setId( plugins.getId() );
        pluginsDTO.setName( plugins.getName() );
        pluginsDTO.setPluginId( plugins.getPluginId() );
        pluginsDTO.setDesc( plugins.getDesc() );
        pluginsDTO.setVersion( plugins.getVersion() );
        pluginsDTO.setAuthor( plugins.getAuthor() );
        pluginsDTO.setStatus( plugins.getStatus() );
        pluginsDTO.setWebsite( plugins.getWebsite() );
        pluginsDTO.setEmail( plugins.getEmail() );

        return pluginsDTO;
    }

    protected PluginsRespVO pluginsToPluginsRespVO(Plugins plugins) {
        if ( plugins == null ) {
            return null;
        }

        PluginsRespVO pluginsRespVO = new PluginsRespVO();

        pluginsRespVO.setName( plugins.getName() );
        pluginsRespVO.setPluginId( plugins.getPluginId() );
        pluginsRespVO.setDesc( plugins.getDesc() );
        pluginsRespVO.setVersion( plugins.getVersion() );
        pluginsRespVO.setAuthor( plugins.getAuthor() );
        pluginsRespVO.setWebsite( plugins.getWebsite() );
        pluginsRespVO.setEmail( plugins.getEmail() );
        pluginsRespVO.setStatus( plugins.getStatus() );
        pluginsRespVO.setId( plugins.getId() );
        pluginsRespVO.setCreateTime( plugins.getCreateTime() );
        pluginsRespVO.setUpdateTime( plugins.getUpdateTime() );

        return pluginsRespVO;
    }

    protected List<PluginsRespVO> pluginsListToPluginsRespVOList(List<Plugins> list) {
        if ( list == null ) {
            return null;
        }

        List<PluginsRespVO> list1 = new ArrayList<PluginsRespVO>( list.size() );
        for ( Plugins plugins : list ) {
            list1.add( pluginsToPluginsRespVO( plugins ) );
        }

        return list1;
    }
}
