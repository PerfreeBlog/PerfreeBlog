package com.perfree.service.attachLibraryItems;

import cn.hutool.core.collection.ListUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import com.perfree.commons.utils.MyBatisUtils;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.attachLibraryItems.vo.*;
import com.perfree.convert.attachLibraryItems.AttachLibraryItemsConvert;
import com.perfree.mapper.AttachLibraryItemsMapper;
import com.perfree.model.AttachLibraryItems;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description 附件库数据 ServiceImpl
 * @author Perfree
 **/
@Service
public class AttachLibraryItemsServiceImpl extends ServiceImpl<AttachLibraryItemsMapper, AttachLibraryItems> implements AttachLibraryItemsService {

    @Resource
    private AttachLibraryItemsMapper attachLibraryItemsMapper;


    @Override
    public PageResult<AttachLibraryItemsRespVO> attachLibraryItemsPage(AttachLibraryItemsPageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        IPage<AttachLibraryItemsRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<AttachLibraryItemsRespVO> attachLibraryItemsRespVOIPage = attachLibraryItemsMapper.attachLibraryItemsPage(page, pageVO);
        return new PageResult<>(attachLibraryItemsRespVOIPage.getRecords(), attachLibraryItemsRespVOIPage.getTotal());
    }

    @Override
    @Transactional
    public AttachLibraryItems add(AttachLibraryItemsAddReqVO attachLibraryItemsAddReqVO) {
        AttachLibraryItems attachLibraryItems = AttachLibraryItemsConvert.INSTANCE.convertAddReqVO(attachLibraryItemsAddReqVO);
        attachLibraryItemsMapper.insert(attachLibraryItems);
        return attachLibraryItems;
    }

    @Override
    @Transactional
    public AttachLibraryItems update(AttachLibraryItemsUpdateReqVO attachLibraryItemsUpdateReqVO) {
        AttachLibraryItems attachLibraryItems = AttachLibraryItemsConvert.INSTANCE.convertUpdateReqVO(attachLibraryItemsUpdateReqVO);
        attachLibraryItemsMapper.updateById(attachLibraryItems);
        return attachLibraryItems;
    }

    @Override
    public AttachLibraryItemsRespVO get(Integer id) {
        return attachLibraryItemsMapper.getById(id);
    }

    @Override
    @Transactional
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
