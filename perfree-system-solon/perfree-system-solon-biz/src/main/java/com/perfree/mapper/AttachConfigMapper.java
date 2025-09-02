package com.perfree.mapper;

import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.constant.AttachConfigConstant;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigPageReqVO;
import com.perfree.model.AttachConfig;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface AttachConfigMapper extends BaseMapper<AttachConfig> {

    default List<AttachConfig> getAll(){
        return selectListByQuery(new QueryWrapper()
                .orderBy(AttachConfig::getMaster,false)
                .orderBy(AttachConfig::getCreateTime,false));
    }

    default List<AttachConfig> attachConfigPage(AttachConfigPageReqVO pageVO){
        return selectListByQuery(new QueryWrapper()
                .like(AttachConfig::getName, pageVO.getName())
                .orderBy(AttachConfig::getId,false)
        );
    }

    default void clearMaster() {
        AttachConfig attachConfig = new AttachConfig();
        attachConfig.setMaster(false);
        updateByQuery(attachConfig , new QueryWrapper().eq(AttachConfig::getMaster, true));
    }

    default void updateMaster(Integer id){
        AttachConfig attachConfig = new AttachConfig();
        attachConfig.setMaster(true);
        updateByQuery(attachConfig, new QueryWrapper()
                .eq(AttachConfig::getId, id)
        );
    }

    default List<AttachConfig> getAllLocalConfig(){
        return selectListByQuery(new QueryWrapper()
                .eq(AttachConfig::getStorage, AttachConfigConstant.LOCAL_CONFIG)
        );
    }

}
