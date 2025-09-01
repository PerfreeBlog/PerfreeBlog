package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
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
@Db
public interface MailTemplateMapper extends BaseMapperX<MailTemplate> {

    default PageResult<MailTemplate> selectPage(MailTemplatePageReqVO reqVO) {
        LambdaQueryWrapper<MailTemplate> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getName()), MailTemplate::getName, reqVO.getName());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getCode()), MailTemplate::getCode, reqVO.getCode());
        lambdaQueryWrapper.eq(null != reqVO.getMailServerId(), MailTemplate::getMailServerId, reqVO.getMailServerId());
        lambdaQueryWrapper.orderByDesc(MailTemplate::getId);
        return selectPage(reqVO, lambdaQueryWrapper);
    }

    default List<MailTemplate> listAll() {
        return selectList(new LambdaQueryWrapper<MailTemplate>()
            .orderByDesc(MailTemplate::getId)
        );
    }

    default List<MailTemplate> queryExportData(MailTemplateExportReqVO reqVO){
        LambdaQueryWrapper<MailTemplate> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getName()), MailTemplate::getName, reqVO.getName());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getCode()), MailTemplate::getCode, reqVO.getCode());
        lambdaQueryWrapper.eq(null != reqVO.getMailServerId(), MailTemplate::getMailServerId, reqVO.getMailServerId());
        lambdaQueryWrapper.orderByDesc(MailTemplate::getId);
        return selectList(lambdaQueryWrapper);
    }

    default MailTemplate getByCode(String templateCode){
        return selectOne(new LambdaQueryWrapper<MailTemplate>().eq(MailTemplate::getCode, templateCode));
    }

}