package com.perfree.service.journal;

import com.mybatisflex.solon.service.impl.ServiceImpl;
import com.perfree.controller.auth.journal.vo.JournalAttachAddReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.convert.article.ArticleConvert;
import com.perfree.convert.journalAttach.JournalAttachConvert;
import com.perfree.mapper.JournalAttachMapper;
import com.perfree.model.JournalAttach;
import jakarta.annotation.Resource;
import org.apache.ibatis.solon.annotation.Db;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Component
public class JournalAttachServiceImpl extends ServiceImpl<JournalAttachMapper, JournalAttach> implements JournalAttachService {

    @Inject
    private JournalAttachMapper journalAttachMapper;

    @Override
    public void delByArticleId(Integer id) {
        journalAttachMapper.delByArticleId(id);
    }

    @Override
    public List<JournalAttach> handleJournalAttach(List<JournalAttachAddReqVO> attachList, Integer articleId) {
        List<JournalAttach> journalAttachList = JournalAttachConvert.INSTANCE.convertAddReqList(attachList);
        if (!journalAttachList.isEmpty()) {
            for (JournalAttach journalAttach : journalAttachList) {
                journalAttach.setArticleId(articleId);
            }
            journalAttachMapper.insertBatch(journalAttachList);
        } else {
            journalAttachList = new ArrayList<>();
        }
        return journalAttachList;
    }
}
