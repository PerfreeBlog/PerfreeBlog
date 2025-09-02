package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.user.vo.UserExportReqVO;
import com.perfree.controller.auth.user.vo.UserPageReqVO;
import com.perfree.enums.UserStatusEnum;
import com.perfree.model.User;
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
public interface UserMapper extends BaseMapper<User> {

    default User findByAccount(String account){
        return selectOneByQuery(new QueryWrapper().eq(User::getAccount, account));
    }

    default List<User> selectPage(UserPageReqVO pageVO) {
        return selectListByQuery(new QueryWrapper()
                .like(User::getUserName, pageVO.getUserName())
                .like(User::getAccount, pageVO.getAccount())
                .orderBy(User::getId,false)
        );
    }

    default List<User> queryExportData(UserExportReqVO reqVO){
        return selectListByQuery(new QueryWrapper()
                .like(User::getUserName, reqVO.getUserName())
                .like(User::getAccount, reqVO.getAccount())
                .orderBy(User::getId,false)
        );
    }

    default Long getTotalUser(){
        return selectCountByQuery(new QueryWrapper().eq(User::getStatus, UserStatusEnum.ENABLE.getCode()));
    }

}
