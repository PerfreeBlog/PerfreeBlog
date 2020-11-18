package com.perfree.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Pager;
import com.perfree.mapper.ArticleMapper;
import com.perfree.model.Article;
import com.perfree.model.Tag;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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

    /**
     * 文章管理列表数据
     * @param pager pager
     * @return  Pager<Article>
     */
    public Pager<Article> list(Pager<Article> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Article> articles = articleMapper.getList(pager.getForm());
        PageInfo<Article> pageInfo = new PageInfo<>(articles);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }
}
