package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class SystemController extends BaseViewController {

    @GetMapping("/")
    public String index() {
        return themeView("index.html");
    }

    @GetMapping(value = {"/articleList/{pageIndex}", "/articleList", "article"})
    public String articleListPage(@PathVariable(value = "pageIndex", required = false) String pageIndex, Model model) {
        if (StringUtils.isBlank(pageIndex)) {
            pageIndex = "1";
        }
        model.addAttribute("pageIndex", Integer.parseInt(pageIndex));
        return themeView("articleList.html");
    }
}
