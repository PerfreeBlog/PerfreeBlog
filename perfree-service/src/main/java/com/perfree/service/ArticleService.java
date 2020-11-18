package com.perfree.service;

import com.perfree.mapper.ArticleMapper;
import com.perfree.model.Article;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ArticleService {
    @Autowired
    private ArticleMapper articleMapper;

    /**
     * 添加文章
     * @param article article
     * @return int
     */
    public int add(Article article) {
        article.setCreateTime(new Date());
        if (StringUtils.isNotBlank(article.getPassword())) {
            article.setPassword(new Md5Hash(article.getPassword()).toString());
        }
        int result = articleMapper.add(article);
        if (article.getArticleTags().size() > 0) {
            article.getArticleTags().forEach(r -> {
                r.setArticleId(article.getId());
            });
            // 添加标签关联
            articleMapper.addArticleTag(article.getArticleTags());
        }
        return result;
    }
}
