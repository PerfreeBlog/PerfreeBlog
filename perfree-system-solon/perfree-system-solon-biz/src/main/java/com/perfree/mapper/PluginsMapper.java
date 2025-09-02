package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.constant.PluginConstant;
import com.perfree.controller.auth.plugins.vo.PluginsPageReqVO;
import com.perfree.model.Plugins;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.solon.annotation.Db;

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
public interface PluginsMapper extends BaseMapper<Plugins> {

    /**
     * 插件分页
     * @param pageVO pageVO
     * @return PageResult<Plugins>
     */
    default List<Plugins> selectPage(PluginsPageReqVO pageVO) {
        return selectListByQuery(new QueryWrapper()
                .like(Plugins::getName, pageVO.getName()));
    }

    default void delByPluginId(String pluginId){
        deleteByQuery(new QueryWrapper().eq(Plugins::getPluginId, pluginId));
    }

    default List<Plugins> getAllEnablePlugins(){
        return selectListByQuery(new QueryWrapper().eq(Plugins::getStatus, PluginConstant.PLUGIN_STATUS_ENABLE));
    }

    default Plugins getByPluginId(String pluginId){
        return selectOneByQuery(new QueryWrapper().eq(Plugins::getPluginId, pluginId));
    }

}
