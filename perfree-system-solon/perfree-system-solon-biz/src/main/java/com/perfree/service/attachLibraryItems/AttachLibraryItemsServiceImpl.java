package com.perfree.service.attachLibraryItems;

import com.mybatisflex.solon.service.impl.ServiceImpl;
import com.perfree.controller.auth.attachLibraryItems.vo.*;
import com.perfree.convert.attachLibraryItems.AttachLibraryItemsConvert;
import com.perfree.mapper.AttachLibraryItemsMapper;
import com.perfree.model.AttachLibraryItems;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.noear.solon.data.annotation.Transaction;

import java.util.List;

/**
 * @description 附件库数据 ServiceImpl
 * @author Perfree
 **/
@Component
public class AttachLibraryItemsServiceImpl extends ServiceImpl<AttachLibraryItemsMapper, AttachLibraryItems> implements AttachLibraryItemsService {

    @Inject
    private AttachLibraryItemsMapper attachLibraryItemsMapper;


    @Override
    public List<AttachLibraryItemsRespVO> attachLibraryItemsPage(AttachLibraryItemsPageReqVO pageVO) {
        List<AttachLibraryItemsRespVO> attachLibraryItemsRespVOList = attachLibraryItemsMapper.attachLibraryItemsPage(pageVO);
        return attachLibraryItemsRespVOList;
    }

    @Override
    @Transaction
    public AttachLibraryItems add(AttachLibraryItemsAddReqVO attachLibraryItemsAddReqVO) {
        AttachLibraryItems attachLibraryItems = AttachLibraryItemsConvert.INSTANCE.convertAddReqVO(attachLibraryItemsAddReqVO);
        attachLibraryItemsMapper.insert(attachLibraryItems);
        return attachLibraryItems;
    }

    @Override
    @Transaction
    public AttachLibraryItems update(AttachLibraryItemsUpdateReqVO attachLibraryItemsUpdateReqVO) {
        AttachLibraryItems attachLibraryItems = AttachLibraryItemsConvert.INSTANCE.convertUpdateReqVO(attachLibraryItemsUpdateReqVO);
        updateById(attachLibraryItems);
        return attachLibraryItems;
    }

    @Override
    public AttachLibraryItemsRespVO get(Integer id) {
        return attachLibraryItemsMapper.getById(id);
    }

    @Override
    @Transaction
    public Boolean del(Integer id) {
        attachLibraryItemsMapper.deleteById(id);
        return true;
    }

    @Override
    public List<AttachLibraryItems> listAll() {
        return attachLibraryItemsMapper.listAll();
    }

    @Override
    public List<AttachLibraryItems> queryExportData(AttachLibraryItemsExportReqVO exportReqVO) {
        return attachLibraryItemsMapper.queryExportData(exportReqVO);
    }

    @Override
    public List<AttachLibraryItems> batchAdd(AttachLibraryItemsBatchAddReqVO attachLibraryItemsAddReqVO) {
        List<AttachLibraryItems> attachLibraryItemsList = AttachLibraryItemsConvert.INSTANCE.convertBatchAddReqVO(attachLibraryItemsAddReqVO.getAttachList());
        attachLibraryItemsMapper.insertBatch(attachLibraryItemsList);
        return attachLibraryItemsList;
    }
}
