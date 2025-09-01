package com.perfree.service.mailServer;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailServer.vo.*;
import com.perfree.convert.mailServer.MailServerConvert;
import com.perfree.mapper.MailServerMapper;
import com.perfree.model.MailServer;
import org.apache.ibatis.solon.annotation.Db;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.noear.solon.data.annotation.Transaction;

import java.util.List;

/**
 * @description 邮箱服务 ServiceImpl
 * @author Perfree
 **/
@Component
public class MailServerServiceImpl extends ServiceImpl<MailServerMapper, MailServer> implements MailServerService {

    @Inject
    private MailServerMapper mailServerMapper;


    @Override
    public PageResult<MailServer> mailServerPage(MailServerPageReqVO pageVO) {
        return mailServerMapper.selectPage(pageVO);
    }

    @Override
    @Transaction
    public MailServer add(MailServerAddReqVO mailServerAddReqVO) {
        MailServer mailServer = MailServerConvert.INSTANCE.convertAddReqVO(mailServerAddReqVO);
        mailServerMapper.insert(mailServer);
        return mailServer;
    }

    @Override
    @Transaction
    public MailServer update(MailServerUpdateReqVO mailServerUpdateReqVO) {
        MailServer mailServer = MailServerConvert.INSTANCE.convertUpdateReqVO(mailServerUpdateReqVO);
        mailServerMapper.updateById(mailServer);
        return mailServer;
    }

    @Override
    public MailServer get(Integer id) {
        return mailServerMapper.selectById(id);
    }

    @Override
    @Transaction
    public Boolean del(Integer id) {
        mailServerMapper.deleteById(id);
        return true;
    }

    @Override
    public List<MailServer> listAll() {
        return mailServerMapper.listAll();
    }

    @Override
    public List<MailServer> queryExportData(MailServerExportReqVO exportReqVO) {
        return mailServerMapper.queryExportData(exportReqVO);
    }
}
