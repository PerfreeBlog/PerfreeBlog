package com.perfree.service.journal;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.controller.auth.journal.vo.JournalAttachAddReqVO;
import com.perfree.model.JournalAttach;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface JournalAttachService extends IService<JournalAttach> {

    void delByArticleId(Integer id);

    List<JournalAttach> handleJournalAttach(List<JournalAttachAddReqVO> attachList, Integer articleId);

}
