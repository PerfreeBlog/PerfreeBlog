package com.perfree.controller.front;

import com.perfree.common.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.controller.BaseController;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ArticleController extends BaseController {
    @Autowired
    private ArticleService articleService;
    //缓存
    private static final CacheManager cacheManager = CacheManager.newInstance();

    @RequestMapping("/articleList/{pageIndex}")
    public String articleListPage(@PathVariable("pageIndex") int pageIndex,Model model) {
        model.addAttribute("url", Constants.URL_ARTICLE_LIST);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + "/articleList.html");
    }

    @RequestMapping("/article/{articleId}")
    public String articlePage(@PathVariable("articleId") String articleId,Model model, HttpServletRequest request) {
        if (articleId.contains("-")) {
            String[] split = articleId.split("-");
            articleId = split[0];
            model.addAttribute("commentIndex", split[1]);
        }
        cacheCount(articleId, IpUtil.getIpAddr(request));
        Article article = articleService.getById(articleId);
        model.addAttribute("articleId", articleId);
        model.addAttribute("article", article);
        model.addAttribute(Constants.SEO_TITLE, article.getTitle());
        model.addAttribute(Constants.SEO_KEYWORD, article.getMetaKeywords());
        model.addAttribute(Constants.SEO_DESC, article.getMetaDescription());
        return view(currentThemePage() + "/article.html");
    }


    /**
     * 缓存访问量
     * @param articleId articleId
     * @param Ip Ip
     */
    public void cacheCount(String articleId,String Ip){
        Article article = articleService.getById(articleId);
        //查询缓存
        Ehcache cache = cacheManager.getEhcache("articleHits");
        Element element = cache.get(Ip+articleId+"_count");
        if(element==null){
            long count = article.getViewCount() == null?0:article.getViewCount();
            count++;
            cache.put(new Element(Ip+articleId+"_count",count));
            articleService.articleViewCountAdd(article.getId());
        }
    }
}
