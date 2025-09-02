package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.mailServer.vo.*;
import com.perfree.model.MailServer;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;
import org.apache.ibatis.solon.annotation.Db;

import java.util.List;
import java.util.Objects;




/**
* @description 邮箱服务
* @author Perfree
*/
@Mapper
public interface MailServerMapper extends BaseMapper<MailServer> {

    default List<MailServer> selectPage(MailServerPageReqVO reqVO) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like(MailServer::getName, reqVO.getName());
        queryWrapper.like(MailServer::getAccount, reqVO.getAccount());
        queryWrapper.orderBy(MailServer::getId,false);
        return selectListByQuery(queryWrapper);
    }

    default List<MailServer> listAll() {
        return selectListByQuery(new QueryWrapper()
            .orderBy(MailServer::getId,false)
        );
    }

    default List<MailServer> queryExportData(MailServerExportReqVO reqVO){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like(MailServer::getName, reqVO.getName());
        queryWrapper.like(MailServer::getAccount, reqVO.getAccount());
        queryWrapper.orderBy(MailServer::getId,false);
        return selectListByQuery(queryWrapper);
    }

}