package com.perfree.service.articleCategory;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.model.ArticleCategory;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface ArticleCategoryService extends IService<ArticleCategory> {

    /**
     * 处理文章/分类关联关系
     * @param categoryIds categoryIds
     * @param articleId articleId
     */
    void handleArticleCategory(List<Integer> categoryIds, Integer articleId);

    /**
     * 根据文章id删除关联关系
     * @param articleId articleId
     */
    void delByArticleId(Integer articleId);

}
