package com.perfree.service.impl;

import cn.hutool.core.date.DateUtil;
import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.mapper.ArticleMapper;
import com.perfree.mapper.CategoryMapper;
import com.perfree.mapper.OptionMapper;
import com.perfree.mapper.TagMapper;
import com.perfree.model.Article;
import com.perfree.model.Category;
import com.perfree.model.Tag;
import com.perfree.service.SEOService;
import com.redfin.sitemapgenerator.ChangeFreq;
import com.redfin.sitemapgenerator.WebSitemapGenerator;
import com.redfin.sitemapgenerator.WebSitemapUrl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class SEOServiceImpl implements SEOService {
    private final Logger logger = LoggerFactory.getLogger(SEOServiceImpl.class);
    @Value("${server.port}")
    private int serverPort;
    @Resource
    private ArticleMapper articleMapper;
    @Resource
    private CategoryMapper categoryMapper;
    @Resource
    private TagMapper tagMapper;
    @Resource
    private OptionMapper optionMapper;

    public String createSiteMapXmlContent() {
        String baseUrl = OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_SITE, IpUtil.getUrl(serverPort));
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        WebSitemapGenerator wsg = null;
        try {
            wsg = new WebSitemapGenerator(baseUrl);
            // 首页
            WebSitemapUrl url = new WebSitemapUrl.Options(baseUrl)
                    .lastMod(dateTimeFormatter.format(LocalDateTime.now())).priority(1.0).changeFreq(ChangeFreq.DAILY).build();
            wsg.addUrl(url);
            // 归档
            WebSitemapUrl archiveUrl = new WebSitemapUrl.Options(baseUrl + "/archive")
                    .lastMod(dateTimeFormatter.format(LocalDateTime.now())).priority(0.9).changeFreq(ChangeFreq.DAILY).build();
            wsg.addUrl(archiveUrl);
            // 友链
            WebSitemapUrl linkUrl = new WebSitemapUrl.Options(baseUrl + "/link")
                    .lastMod(dateTimeFormatter.format(LocalDateTime.now())).priority(0.9).changeFreq(ChangeFreq.DAILY).build();
            wsg.addUrl(linkUrl);
            // 文章
            List<Article> articles = articleMapper.getList(new Article());
            for (Article article : articles) {
                WebSitemapUrl tmpUrl = new WebSitemapUrl.Options(baseUrl + "/article/" + article.getId())
                        .lastMod(DateUtil.format(article.getCreateTime(), "YYYY-MM-dd HH:mm:ss")).priority(0.9).changeFreq(ChangeFreq.DAILY).build();
                wsg.addUrl(tmpUrl);
            }
            // 分类
            List<Category> categories = categoryMapper.getList(new Category());
            for (Category category : categories) {
                WebSitemapUrl tmpUrl = new WebSitemapUrl.Options(baseUrl + "/category/" + category.getId())
                        .lastMod(DateUtil.format(category.getCreateTime(), "YYYY-MM-dd HH:mm:ss")).priority(0.8).changeFreq(ChangeFreq.DAILY).build();
                wsg.addUrl(tmpUrl);
            }
            // 标签
            List<Tag> tags = tagMapper.getList(new Tag());
            for (Tag tag : tags) {
                WebSitemapUrl tmpUrl = new WebSitemapUrl.Options(baseUrl + "/tag/" + tag.getId())
                        .lastMod(DateUtil.format(tag.getCreateTime(), "YYYY-MM-dd HH:mm:ss")).priority(0.8).changeFreq(ChangeFreq.DAILY).build();
                wsg.addUrl(tmpUrl);
            }
            return String.join("", wsg.writeAsStrings());
        } catch (Exception e) {
            logger.error("create sitemap xml error:", e);
            return null;
        }
    }
}
