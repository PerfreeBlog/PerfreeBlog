package com.perfree.service.attachLibrary;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachLibrary.vo.*;
import com.perfree.model.AttachLibrary;

import java.util.List;

/**
 * @description 附件库 Service
 * @author Perfree
 **/
public interface AttachLibraryService extends IService<AttachLibrary> {

    /**
     * 附件库分页
     * @param pageVO pageVO
     * @return PageResult<AttachLibraryRespVO>
     */
    PageResult<AttachLibraryRespVO> attachLibraryPage(AttachLibraryPageReqVO pageVO);

    /**
     * 添加附件库
     * @param addReqVO addReqVO
     * @return AttachLibrary
     */
    AttachLibrary add(AttachLibraryAddReqVO addReqVO);

    /**
     * 更新附件库
     * @param updateReqVO updateReqVO
     * @return AttachLibrary
     */
    AttachLibrary update(AttachLibraryUpdateReqVO updateReqVO);

    /**
     * 根据id获取附件库信息
     * @param id id
     * @return AttachLibraryRespVO
     */
    AttachLibraryRespVO get(Integer id);

    /**
     * 根据id删除附件库
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 获取所有附件库
     * @return List<AttachLibrary>
     */
    List<AttachLibrary> listAll();

    /**
     * 查询要导出的数据
     * @param exportReqVO exportReqVO
     * @return List<AttachLibrary>
     */
    List<AttachLibrary> queryExportData(AttachLibraryExportReqVO exportReqVO);
}