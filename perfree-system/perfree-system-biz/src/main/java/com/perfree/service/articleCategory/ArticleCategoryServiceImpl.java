package com.perfree.service.articleCategory;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.mapper.ArticleCategoryMapper;
import com.perfree.model.ArticleCategory;
import jakarta.annotation.Resource;
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
@Service
public class ArticleCategoryServiceImpl extends ServiceImpl<ArticleCategoryMapper, ArticleCategory> implements ArticleCategoryService {

    @Resource
    private ArticleCategoryMapper articleCategoryMapper;

    @Override
    public void handleArticleCategory(List<Integer> categoryIds, Integer articleId) {
        if (null == categoryIds || categoryIds.isEmpty()) {
            return;
        }
        List<ArticleCategory> articleCategoryList = new ArrayList<>();
        for (Integer categoryId : categoryIds) {
            ArticleCategory articleCategory = new ArticleCategory();
            articleCategory.setArticleId(articleId);
            articleCategory.setCategoryId(categoryId);
            articleCategoryList.add(articleCategory);
        }
        articleCategoryMapper.delByArticleId(articleId);
        articleCategoryMapper.insertBatch(articleCategoryList);
    }

    @Override
    public void delByArticleId(Integer articleId) {
        articleCategoryMapper.delByArticleId(articleId);
    }
}
