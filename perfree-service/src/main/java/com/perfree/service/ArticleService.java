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

import java.util.Arrays;
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

    /**
     * 更改置顶状态
     * @param article article
     * @return int
     */
    public int changeTopStatus(Article article) {
        article.setUpdateTime(new Date());
        return articleMapper.changeTopStatus(article);
    }

    /**
     * 更改是否可以评论
     * @param article article
     * @return int
     */
    public int changeCommentStatus(Article article) {
        article.setUpdateTime(new Date());
        return articleMapper.changeCommentStatus(article);
    }

    /**
     * 更改文章状态
     * @param article article
     * @return int
     */
    public int changeStatus(Article article) {
        article.setUpdateTime(new Date());
        return articleMapper.changeStatus(article);
    }

    /**
     * 删除文章
     * @param idArr idArr
     * @return int
     */
    public int del(String[] idArr) {
        Arrays.asList(idArr).forEach(r -> {
            articleMapper.deleteTagByArticleId(r);
        });
        return articleMapper.del(idArr);
    }

    /**
     * 根据id获取文章信息
     * @param id id
     * @return Article
     */
    public Article getById(String id) {
        return articleMapper.getById(id);
    }

    /**
     * 更新文章
     * @param article article
     * @return int
     */
    public int update(Article article) {
        article.setUpdateTime(new Date());
        // 先删除标签关联
        articleMapper.deleteTagByArticleId(article.getId().toString());
        if (article.getArticleTags().size() > 0) {
            article.getArticleTags().forEach(r -> {
                r.setArticleId(article.getId());
            });
            // 添加标签关联
            articleMapper.addArticleTag(article.getArticleTags());
        }
        return articleMapper.update(article);
    }
}
