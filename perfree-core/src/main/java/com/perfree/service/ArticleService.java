package com.perfree.service;

import com.perfree.commons.Pager;
import com.perfree.directive.DirectivePage;
import com.perfree.model.Archive;
import com.perfree.model.Article;
import com.perfree.model.Menu;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

/**
 * @description ArticleService
 * @author Perfree
 * @date 2021/11/15 9:48
 */
public interface ArticleService {
    /**
     * 添加文章
     * @param article article
     * @return int
     */
    int add(Article article);

    /**
     * 文章管理列表数据
     * @param pager pager
     * @return  Pager<Article>
     */
    Pager<Article> list(Pager<Article> pager);

    /**
     * 更改置顶状态
     * @param article article
     * @return int
     */
    int changeTopStatus(Article article);

    /**
     * 更改是否可以评论
     * @param article article
     * @return int
     */
    int changeCommentStatus(Article article);

    /**
     * 更改文章状态
     * @param article article
     * @return int
     */
    int changeStatus(Article article);

    /**
     * 删除文章
     * @param idArr idArr
     * @return int
     */
    int del(String[] idArr);

    /**
     * 根据id获取文章信息
     * @param id id
     * @return Article
     */
    Article getById(String id);

    /**
     * 更新文章
     * @param article article
     * @return int
     */
    int update(Article article);

    /**
     * 获取文章数量
     * @return Long
     */
    Long getArticleCount();

    /**
     * 获取最新的文章(后台首页)
     * @return List<Article
     */
    List<Article> getArticleListByDashboard(int count);

    /**
     * 获取热门文章
     * @return List<Article>
     */
    List<Article> getHotArticle(int count,int type);

    List<Article> getLatestArticle(int count);

    /**
     * 获取下一篇文章
     * @param articleId articleId
     * @return Article
     */
    Article getNextArticle(Long articleId);

    /**
     * 前台文章分页
     * @param directivePage directivePage
     * @return List<Article>
     */
    DirectivePage<HashMap<String, String>> frontArticlesPage(DirectivePage<HashMap<String, String>> directivePage);

    /**
     * 获取上一篇文章
     * @param articleId articleId
     * @return Article
     */
    Article getPreArticle(Long articleId);

    void articleCommentAdd(Long articleId);

    void articleCommentSub(String[] idArr);

    /**
     * 获取归档列表
     * @param articlePage articlePage
     * @return DirectivePage<HashMap<String, String>>
     */
    DirectivePage<HashMap<String, String>> frontArchivePage(DirectivePage<HashMap<String, String>> articlePage);

    void articleViewCountAdd(Long articleId);

    List<Article> getPageList();

    /**
     * 获取文章列表(API)
     * @param pager pager
     * @return Pager<Article>
     */
    Pager<Article> apiList(Pager<Article> pager);

    /**
     * 获取文章归档数据
     * @param pager pager
     * @return Pager<Archive>
     */
    Pager<Archive> getApiArchive(Pager<Archive> pager);

    void cacheCount(String articleId,String Ip);

    Article getBySlug(String slug, String articleType);

    Pager<Article> getListByTagId(Pager<Article> pager, String tagId);

    void updateGreatCount(Long articleId);
}
