package com.perfree.controller.front;

import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.base.BaseController;
import com.perfree.model.Article;
import com.perfree.model.Menu;
import com.perfree.service.ArticleService;
import com.perfree.service.MenuService;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class PageController extends BaseController {
    //缓存
    private static final CacheManager cacheManager = CacheManager.newInstance();

    private Menu setArticle (String pageName, Model model,HttpServletRequest request) {
        MenuService menuService = SpringBeanUtils.getBean(MenuService.class);
        ArticleService articleService = SpringBeanUtils.getBean(ArticleService.class);
        Menu menu = menuService.getMenuByUrl(pageName );
        if (menu != null && menu.getArticleId() != null) {
            Article article = articleService.getById(menu.getArticleId().toString());
            cacheCount(article.getId().toString(), IpUtil.getIpAddr(request));
            model.addAttribute("article", article);
            model.addAttribute(Constants.SEO_TITLE, article.getTitle());
            model.addAttribute(Constants.SEO_KEYWORD, article.getMetaKeywords());
            model.addAttribute(Constants.SEO_DESC, article.getMetaDescription());
        }
        return menu;
    }

    /**
     * 缓存访问量
     * @param articleId articleId
     * @param Ip Ip
     */
    public void cacheCount(String articleId,String Ip){
        ArticleService articleService = SpringBeanUtils.getBean(ArticleService.class);
        Article article = articleService.getById(articleId);
        //查询缓存
        Ehcache cache = cacheManager.getEhcache("articleHits");
        Element element = cache.get(Ip+articleId+"_count");
        if(element==null && article != null){
            long count = article.getViewCount() == null?0:article.getViewCount();
            count++;
            cache.put(new Element(Ip+articleId+"_count",count));
            articleService.articleViewCountAdd(article.getId());
        }
    }

    public String pages(HttpServletRequest request, HttpServletResponse response,Model model) {
        String url = request.getServletPath();
        Menu menu = setArticle(url, model,request);
        if (url.endsWith(Constants.SEPARATOR)){
           url = url.substring(0, url.length() - 1);
        }
        model.addAttribute("url", url + Constants.SEPARATOR);
        return pageView(currentThemePage() + Constants.SEPARATOR + url + ".html", menu);
    }

    public String pages(@PathVariable("pageIndex") int pageIndex,HttpServletRequest request, HttpServletResponse response,Model model) {
        String url = request.getServletPath();
        Menu menu = setArticle(url, model,request);
        url = url.substring(0, url.lastIndexOf("/"));
        model.addAttribute("url", url + Constants.SEPARATOR);
        model.addAttribute("pageIndex", pageIndex);
        return pageView(currentThemePage() + Constants.SEPARATOR + url + ".html", menu);
    }

}
