package com.perfree.service.mailTemplate;

import cn.hutool.core.util.ReUtil;
import com.mybatisflex.solon.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailTemplate.vo.*;
import com.perfree.convert.mailTemplate.MailTemplateConvert;
import com.perfree.mail.MailService;
import com.perfree.mapper.MailTemplateMapper;
import com.perfree.model.MailTemplate;
import org.apache.ibatis.solon.annotation.Db;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.noear.solon.data.annotation.Transaction;

import java.util.List;
import java.util.regex.Pattern;

/**
 * @description 邮件模板 ServiceImpl
 * @author Perfree
 **/
@Component
public class MailTemplateServiceImpl extends ServiceImpl<MailTemplateMapper, MailTemplate> implements MailTemplateService {

    /**
     * 正则表达式，匹配 {} 中的变量
     */
    private static final Pattern PATTERN_PARAMS = Pattern.compile("\\{(.*?)}");

    @Inject
    private MailTemplateMapper mailTemplateMapper;

    @Inject
    private MailService mailService;


    @Override
    public PageResult<MailTemplate> mailTemplatePage(MailTemplatePageReqVO pageVO) {
        return mailTemplateMapper.selectPage(pageVO);
    }

    @Override
    @Transaction
    public MailTemplate add(MailTemplateAddReqVO mailTemplateAddReqVO) {
        MailTemplate mailTemplate = MailTemplateConvert.INSTANCE.convertAddReqVO(mailTemplateAddReqVO);
        mailTemplate.setMailParams(ReUtil.findAllGroup1(PATTERN_PARAMS, mailTemplate.getMailContent()));
        mailTemplateMapper.insert(mailTemplate);
        return mailTemplate;
    }

    @Override
    @Transaction
    public MailTemplate update(MailTemplateUpdateReqVO mailTemplateUpdateReqVO) {
        MailTemplate mailTemplate = MailTemplateConvert.INSTANCE.convertUpdateReqVO(mailTemplateUpdateReqVO);
        mailTemplate.setMailParams(ReUtil.findAllGroup1(PATTERN_PARAMS, mailTemplate.getMailContent()));
        mailTemplateMapper.updateById(mailTemplate);
        return mailTemplate;
    }

    @Override
    public MailTemplate get(Integer id) {
        return mailTemplateMapper.selectById(id);
    }

    @Override
    @Transaction
    public Boolean del(Integer id) {
        mailTemplateMapper.deleteById(id);
        return true;
    }

    @Override
    public List<MailTemplate> listAll() {
        return mailTemplateMapper.listAll();
    }

    @Override
    public List<MailTemplate> queryExportData(MailTemplateExportReqVO exportReqVO) {
        return mailTemplateMapper.queryExportData(exportReqVO);
    }

    @Override
    public Boolean testMail(MailTemplateTestReqVO mailTemplateTestReqVO) {
        return mailService.sendMailByTemplateId(mailTemplateTestReqVO.getMailTemplateId(), mailTemplateTestReqVO.getReceiveMail(), mailTemplateTestReqVO.getMailParams());
    }

    @Override
    public MailTemplate getByCode(String templateCode) {
        return mailTemplateMapper.getByCode(templateCode);
    }
}
