package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.mailLog.vo.*;
import com.perfree.model.MailLog;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;
import org.apache.ibatis.solon.annotation.Db;

import java.util.List;
import java.util.Objects;




/**
* @description 邮件日志
* @author Perfree
*/
@Mapper
public interface MailLogMapper extends BaseMapperX<MailLog> {

    default PageResult<MailLog> selectPage(MailLogPageReqVO reqVO) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like(MailLog::getMailTemplateCode, reqVO.getMailTemplateCode());
        if (reqVO.getSendDate() != null && reqVO.getSendDate().length > 0 && reqVO.getSendDate()[0] != null) {
            queryWrapper.ge(MailLog::getSendDate, reqVO.getSendDate()[0]);
        }
        if (reqVO.getSendDate() != null && reqVO.getSendDate().length > 1 && reqVO.getSendDate()[1] != null) {
            queryWrapper.le(MailLog::getSendDate, reqVO.getSendDate()[1]);
        }
        queryWrapper.like(MailLog::getReceiveMail, reqVO.getReceiveMail());
        queryWrapper.like(MailLog::getMailTitle, reqVO.getMailTitle());
        queryWrapper.eq(MailLog::getSendStatus, reqVO.getSendStatus());
        queryWrapper.like(MailLog::getSendMail, reqVO.getSendMail());
        queryWrapper.orderBy(MailLog::getId, false);
        return selectPage(reqVO, queryWrapper);
    }

    default List<MailLog> listAll() {
        return selectListByQuery(new QueryWrapper()
            .orderBy(MailLog::getId,false)
        );
    }

    default List<MailLog> queryExportData(MailLogExportReqVO reqVO){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like(MailLog::getMailTemplateCode, reqVO.getMailTemplateCode());
        if (reqVO.getSendDate() != null && reqVO.getSendDate().length > 0 && reqVO.getSendDate()[0] != null) {
            queryWrapper.ge(MailLog::getSendDate, reqVO.getSendDate()[0]);
        }
        if (reqVO.getSendDate() != null && reqVO.getSendDate().length > 1 && reqVO.getSendDate()[1] != null) {
            queryWrapper.le(MailLog::getSendDate, reqVO.getSendDate()[1]);
        }
        queryWrapper.like(MailLog::getReceiveMail, reqVO.getReceiveMail());
        queryWrapper.like(MailLog::getMailTitle, reqVO.getMailTitle());
        queryWrapper.eq(MailLog::getSendStatus, reqVO.getSendStatus());
        queryWrapper.like(MailLog::getSendMail, reqVO.getSendMail());
        queryWrapper.orderBy(MailLog::getId, false);
        return selectListByQuery(queryWrapper);
    }

}