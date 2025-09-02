package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.mailTemplate.vo.*;
import com.perfree.model.MailTemplate;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.solon.annotation.Db;

import java.util.List;




/**
* @description 邮件模板
* @author Perfree
*/
@Mapper
public interface MailTemplateMapper extends BaseMapper<MailTemplate> {

    default List<MailTemplate> selectPage(MailTemplatePageReqVO reqVO) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like(MailTemplate::getName, reqVO.getName());
        queryWrapper.like(MailTemplate::getCode, reqVO.getCode());
        queryWrapper.eq(MailTemplate::getMailServerId, reqVO.getMailServerId());
        queryWrapper.orderBy(MailTemplate::getId,false);
        return selectListByQuery(queryWrapper);
    }

    default List<MailTemplate> listAll() {
        return selectListByQuery(new QueryWrapper()
            .orderBy(MailTemplate::getId,false)
        );
    }

    default List<MailTemplate> queryExportData(MailTemplateExportReqVO reqVO){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like(MailTemplate::getName, reqVO.getName());
        queryWrapper.like(MailTemplate::getCode, reqVO.getCode());
        queryWrapper.eq(MailTemplate::getMailServerId, reqVO.getMailServerId());
        queryWrapper.orderBy(MailTemplate::getId,false);
        return selectListByQuery(queryWrapper);
    }

    default MailTemplate getByCode(String templateCode){
        return selectOneByQuery(new QueryWrapper().eq(MailTemplate::getCode, templateCode));
    }

}