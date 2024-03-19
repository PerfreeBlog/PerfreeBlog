package com.perfree.service.impl;

import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.mapper.ArticleMapper;
import com.perfree.model.Article;
import com.perfree.service.RssServices;
import com.rometools.rome.feed.rss.Category;
import com.rometools.rome.feed.rss.Channel;
import com.rometools.rome.feed.rss.Description;
import com.rometools.rome.feed.rss.Item;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.WireFeedOutput;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @description rss生成
 * @author Perfree
 * @date 2021/11/24 13:58
 */
@Service
public class RssServicesImpl implements RssServices {
    private final Logger logger = LoggerFactory.getLogger(SEOServiceImpl.class);
    private static final String RSS_MODE_FULL = "0";
    private static final String RSS_DEFAULT_NUM = "20";

    @Value("${server.port}")
    private int serverPort;

    @Resource
    private ArticleMapper articleMapper;

    public String genRss(){
        Date date = new Date();
        String rssGenMode = OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_RSS_GEN_MODE, RSS_MODE_FULL);
        String webSite = OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_SITE, IpUtil.getUrl(serverPort));
        String rssNum = OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_RSS_GEN_NUM, RSS_DEFAULT_NUM);

        Channel channel = new Channel("rss_2.0");
        channel.setTitle(OptionCacheUtil.getValue(Constants.OPTION_WEB_TITLE));
        channel.setDescription(OptionCacheUtil.getValue(Constants.OPTION_WEB_META_DESC));
        channel.setLink(webSite);
        channel.setLastBuildDate(date);
        channel.setEncoding("GBK");

        List<Item> items = new ArrayList<>();
        List<Article> latestArticle = articleMapper.getLatestArticle(Integer.parseInt(rssNum));
        for (Article article : latestArticle) {
            Item item = new Item();
            item.setAuthor(article.getUser().getUserName());
            item.setTitle(article.getTitle());
            item.setLink(webSite + Constants.URL_ARTICLE + article.getId());
            if (article.getCategory() != null) {
                List<Category> categories = new ArrayList<>();
                Category category = new Category();
                category.setValue(article.getCategory().getName());
                category.setDomain(webSite + Constants.URL_ARTICLE_CATEGORY + article.getCategory().getId());
                item.setCategories(categories);
            }
            item.setPubDate(new Date());
            Description desc = new Description();
            if (RSS_MODE_FULL.equals(rssGenMode)) {
               // desc.setValue(MarkdownUtil.mdToHtml(article.getContent()));
            } else {
                desc.setValue(article.getSummary());
            }

            item.setDescription(desc);

            items.add(item);
        }
        channel.setItems(items);
        WireFeedOutput out = new WireFeedOutput();
        try {
            return out.outputString(channel);
        } catch (FeedException ex) {
            ex.printStackTrace();
            logger.error("rss gen err : {}",ex.getMessage());
        }
        return "";
    }
}
