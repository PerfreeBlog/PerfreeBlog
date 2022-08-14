package com.perfree.controller.front;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.FrontViewNodeRender;
import com.perfree.commons.IpUtil;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@SuppressWarnings("all")
public class JournalController extends BaseController {
    @Autowired
    private ArticleService articleService;

    @RequestMapping(value = {"/journalList/{pageIndex}", "/journalList", "journal"})
    @FrontViewNodeRender
    public String articleListPage(@PathVariable(value = "pageIndex", required = false) String pageIndex, Model model) {
        model.addAttribute("url", Constants.URL_JOURNAL_LIST);
        if (StringUtils.isBlank(pageIndex)) {
            pageIndex = "1";
        }
        model.addAttribute("pageIndex", Integer.parseInt(pageIndex));
        return view(currentThemePage() + "/journalList.html");
    }

    @RequestMapping("/journal/{id}")
    @FrontViewNodeRender
    public String articlePage(@PathVariable("id") String id,Model model, HttpServletRequest request) {
        if (id.contains("-")) {
            String[] split = id.split("-");
            id = split[0];
            model.addAttribute("commentIndex", split[1]);
        }
        Article article = articleService.getById(id);
        if (article != null) {
            articleService.cacheCount(article.getId().toString(), IpUtil.getIpAddr(request));
            model.addAttribute("articleId", article.getId());
            model.addAttribute("journal", article);
            model.addAttribute(Constants.SEO_TITLE, StringUtils.isBlank(article.getTitle()) ? null : article.getTitle().trim());
            model.addAttribute(Constants.SEO_KEYWORD, StringUtils.isBlank(article.getMetaKeywords()) ? null : article.getMetaKeywords().trim());
            model.addAttribute(Constants.SEO_DESC, StringUtils.isBlank(article.getMetaDescription()) ? null : article.getMetaDescription().trim());
        }
        model.addAttribute("url", Constants.URL_JOURNAL + id);
        return view(currentThemePage() + "/journal.html");
    }

}
