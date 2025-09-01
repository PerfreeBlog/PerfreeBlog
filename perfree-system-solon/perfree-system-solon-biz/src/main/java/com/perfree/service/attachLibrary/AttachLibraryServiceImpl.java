package com.perfree.service.attachLibrary;

import cn.hutool.core.collection.ListUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.MyBatisUtils;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.constant.AttachLibraryConstant;
import com.perfree.controller.auth.attachLibrary.vo.*;
import com.perfree.convert.attachLibrary.AttachLibraryConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.mapper.AttachLibraryMapper;
import com.perfree.model.AttachLibrary;
import com.perfree.security.SecurityFrameworkUtils;
import jakarta.annotation.Resource;
import org.apache.ibatis.solon.annotation.Db;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.noear.solon.data.annotation.Transaction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public PageResult<AttachLibraryRespVO> attachLibraryPage(AttachLibraryPageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        IPage<AttachLibraryRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<AttachLibraryRespVO> attachLibraryRespVOIPage = attachLibraryMapper.attachLibraryPage(page, pageVO, SecurityFrameworkUtils.getLoginUserId());
        return new PageResult<>(attachLibraryRespVOIPage.getRecords(), attachLibraryRespVOIPage.getTotal());
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
        attachLibraryMapper.updateById(attachLibrary);
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
