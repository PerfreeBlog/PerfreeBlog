package com.perfree.service.articleTag;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.model.ArticleTag;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface ArticleTagService extends IService<ArticleTag> {

    /**
     * 处理文章-标签关联关系
     * @param tagIds tagIds
     * @param articleId  articleId
     */
    void handleArticleTag(List<Integer> tagIds, Integer articleId);

    /**
     * 根据文章id删除关联关系
     * @param articleId articleId
     */
    void delByArticleId(Integer articleId);

}
