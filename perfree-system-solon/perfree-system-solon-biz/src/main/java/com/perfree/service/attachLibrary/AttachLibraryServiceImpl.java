package com.perfree.service.attachLibrary;

import com.mybatisflex.solon.service.impl.ServiceImpl;
import com.perfree.commons.exception.ServiceException;
import com.perfree.constant.AttachLibraryConstant;
import com.perfree.controller.auth.attachLibrary.vo.*;
import com.perfree.convert.attachLibrary.AttachLibraryConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.mapper.AttachLibraryMapper;
import com.perfree.model.AttachLibrary;
import com.perfree.security.SecurityFrameworkUtils;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.noear.solon.data.annotation.Transaction;

import java.util.List;

/**
 * @description 附件库 ServiceImpl
 * @author Perfree
 **/
@Component
public class AttachLibraryServiceImpl extends ServiceImpl<AttachLibraryMapper, AttachLibrary> implements AttachLibraryService {

    @Inject
    private AttachLibraryMapper attachLibraryMapper;


    @Override
    public List<AttachLibraryRespVO> attachLibraryPage(AttachLibraryPageReqVO pageVO) {
        List<AttachLibraryRespVO> attachLibraryRespVOIPage = attachLibraryMapper.attachLibraryPage(pageVO, SecurityFrameworkUtils.getLoginUserId());
        return attachLibraryRespVOIPage;
    }

    @Override
    @Transaction
    public AttachLibrary add(AttachLibraryAddReqVO attachLibraryAddReqVO) {
        AttachLibrary attachLibrary = AttachLibraryConvert.INSTANCE.convertAddReqVO(attachLibraryAddReqVO);
        attachLibraryMapper.insert(attachLibrary);
        return attachLibrary;
    }

    @Override
    @Transaction
    public AttachLibrary update(AttachLibraryUpdateReqVO attachLibraryUpdateReqVO) {
        AttachLibrary attachLibrary = AttachLibraryConvert.INSTANCE.convertUpdateReqVO(attachLibraryUpdateReqVO);
        updateById(attachLibrary);
        return attachLibrary;
    }

    @Override
    public AttachLibraryRespVO get(Integer id) {
        AttachLibraryRespVO byId = attachLibraryMapper.getById(id);
        if (byId.getVisibility().equals(AttachLibraryConstant.VISIBILITY_FALSE) && !byId.getUserInfo().getId().equals(SecurityFrameworkUtils.getLoginUserId())) {
            throw new ServiceException(ErrorCode.NO_PERMISSION_PREVIEW);
        }
        return byId;
    }

    @Override
    @Transaction
    public Boolean del(Integer id) {
        attachLibraryMapper.deleteById(id);
        return true;
    }

    @Override
    public List<AttachLibrary> listAll() {
        return attachLibraryMapper.listAll();
    }

    @Override
    public List<AttachLibrary> queryExportData(AttachLibraryExportReqVO exportReqVO) {
        return attachLibraryMapper.queryExportData(exportReqVO);
    }
}
