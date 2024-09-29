package com.perfree.service.attachLibraryItems;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachLibraryItems.vo.*;
import com.perfree.model.AttachLibraryItems;

import java.util.List;

/**
 * @description 附件库数据 Service
 * @author Perfree
 **/
public interface AttachLibraryItemsService extends IService<AttachLibraryItems> {

    /**
     * 附件库数据分页
     * @param pageVO pageVO
     * @return PageResult<AttachLibraryItemsRespVO>
     */
    PageResult<AttachLibraryItemsRespVO> attachLibraryItemsPage(AttachLibraryItemsPageReqVO pageVO);

    /**
     * 添加附件库数据
     * @param addReqVO addReqVO
     * @return AttachLibraryItems
     */
    AttachLibraryItems add(AttachLibraryItemsAddReqVO addReqVO);

    /**
     * 更新附件库数据
     * @param updateReqVO updateReqVO
     * @return AttachLibraryItems
     */
    AttachLibraryItems update(AttachLibraryItemsUpdateReqVO updateReqVO);

    /**
     * 根据id获取附件库数据信息
     * @param id id
     * @return AttachLibraryItemsRespVO
     */
    AttachLibraryItemsRespVO get(Integer id);

    /**
     * 根据id删除附件库数据
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 获取所有附件库数据
     * @return List<AttachLibraryItems>
     */
    List<AttachLibraryItems> listAll();

    /**
     * 查询要导出的数据
     * @param exportReqVO exportReqVO
     * @return List<AttachLibraryItems>
     */
    List<AttachLibraryItems> queryExportData(AttachLibraryItemsExportReqVO exportReqVO);

    List<AttachLibraryItems> batchAdd(AttachLibraryItemsBatchAddReqVO attachLibraryItemsAddReqVO);

}