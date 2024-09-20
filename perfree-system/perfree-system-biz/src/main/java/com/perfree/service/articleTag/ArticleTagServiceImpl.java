package com.perfree.service.articleTag;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.mapper.ArticleTagMapper;
import com.perfree.model.ArticleTag;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class ArticleTagServiceImpl extends ServiceImpl<ArticleTagMapper, ArticleTag> implements ArticleTagService {

    @Resource
    private ArticleTagMapper articleTagMapper;

    @Override
    public void handleArticleTag(List<Integer> tagIds, Integer articleId) {
        if (null == tagIds || tagIds.isEmpty()) {
            return;
        }
        List<ArticleTag> articleTagList = new ArrayList<>();
        for (Integer tagId : tagIds) {
            ArticleTag articleTag = new ArticleTag();
            articleTag.setArticleId(articleId);
            articleTag.setTagId(tagId);
            articleTagList.add(articleTag);
        }
        articleTagMapper.delByArticleId(articleId);
        articleTagMapper.insertBatch(articleTagList);
    }

    @Override
    public void delByArticleId(Integer articleId) {
        articleTagMapper.delByArticleId(articleId);
    }
}
