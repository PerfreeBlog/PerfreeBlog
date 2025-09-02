package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.adminHome.vo.HomeStatisticRespVO;
import com.perfree.controller.auth.attach.vo.AttachGroupRespVO;
import com.perfree.controller.auth.attach.vo.AttachPageReqVO;
import com.perfree.model.Attach;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.solon.annotation.Db;

import java.util.HashMap;
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
public interface AttachMapper extends BaseMapper<Attach> {

    /**
     * 分页查询
     * @param pageVO pageVO
     * @return PageResult<Attach>
     */
    default List<Attach> selectPage(AttachPageReqVO pageVO) {
        return selectListByQuery(new QueryWrapper()
                .like(Attach::getName, pageVO.getName())
                .eq(Attach::getAttachGroup, pageVO.getAttachGroup())
                .eq(Attach::getConfigId, pageVO.getAttachConfigId())
                .eq(Attach::getStorage, pageVO.getStorage())
                .eq(Attach::getType, pageVO.getType())
                .orderBy(Attach::getId,false)
        );
    }

    List<AttachGroupRespVO> getAllAttachGroup();

    HomeStatisticRespVO getTypeCount();

}
