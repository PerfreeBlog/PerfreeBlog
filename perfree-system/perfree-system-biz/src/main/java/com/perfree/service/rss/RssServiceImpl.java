package com.perfree.service.rss;

import com.perfree.cache.OptionCacheService;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.WebUtils;
import com.perfree.constant.OptionConstant;
import com.perfree.controller.auth.article.vo.ArticleCategoryRespVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.enums.OptionEnum;
import com.perfree.service.article.ArticleService;
import com.rometools.rome.feed.rss.Category;
import com.rometools.rome.feed.rss.Channel;
import com.rometools.rome.feed.rss.Description;
import com.rometools.rome.feed.rss.Item;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.WireFeedOutput;
import jakarta.annotation.Resource;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class RssServiceImpl implements RssService{
    private final Logger logger = LoggerFactory.getLogger(RssServiceImpl.class);
    private static final String RSS_MODE_FULL = "0";
    private static final String RSS_DEFAULT_NUM = "20";

    @Value("${server.port}")
    private int serverPort;

    @Resource
    private ArticleService articleService;

    @Resource
    private OptionCacheService optionCacheService;

    @Override
    public String genRss() {
        Date date = new Date();
        String rssGenMode = optionCacheService.getDefaultValue(OptionEnum.WEB_RSS_GEN_MODE.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, RSS_MODE_FULL);
        String webSite = optionCacheService.getDefaultValue(OptionEnum.WEB_SITE.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, WebUtils.getUrl(serverPort));
        String rssNum = optionCacheService.getDefaultValue(OptionEnum.WEB_RSS_GEN_NUM.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, RSS_DEFAULT_NUM);

        Channel channel = new Channel("rss_2.0");
        channel.setTitle(optionCacheService.getDefaultValue(OptionEnum.WEB_TITLE.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, ""));
        channel.setDescription(optionCacheService.getDefaultValue(OptionEnum.WEB_META_DESC.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, ""));
        channel.setLink(webSite);
        channel.setLastBuildDate(date);
        channel.setEncoding("GBK");

        List<Item> items = new ArrayList<>();
        List<ArticleRespVO> latestArticle = articleService.getLatestArticle(Integer.parseInt(rssNum));
        for (ArticleRespVO article : latestArticle) {
            Item item = getItem(article, webSite, rssGenMode);
            items.add(item);
        }
        channel.setItems(items);
        WireFeedOutput out = new WireFeedOutput();
        try {
            return out.outputString(channel);
        } catch (FeedException ex) {
            logger.error("rss gen err : {}",ex.getMessage());
        }
        return "";
    }

    @NotNull
    private static Item getItem(ArticleRespVO article, String webSite, String rssGenMode) {
        Item item = new Item();
        item.setAuthor(article.getUser().getUserName());
        item.setTitle(article.getTitle());
        item.setLink(webSite + SystemConstants.URL_ARTICLE + article.getId());
        if (article.getCategoryList() != null) {
            List<Category> categories = new ArrayList<>();
            for (ArticleCategoryRespVO articleCategoryRespVO : article.getCategoryList()) {
                Category category = new Category();
                category.setValue(articleCategoryRespVO.getName());
                category.setDomain(webSite + SystemConstants.URL_ARTICLE_CATEGORY + articleCategoryRespVO.getId());
                categories.add(category);
            }
            item.setCategories(categories);
        }
        item.setPubDate(new Date());
        Description desc = new Description();
        if (RSS_MODE_FULL.equals(rssGenMode)) {
            desc.setValue(article.getParseContent());
        } else {
            desc.setValue(article.getSummary());
        }

        item.setDescription(desc);
        return item;
    }
}
