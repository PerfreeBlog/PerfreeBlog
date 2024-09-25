package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import com.perfree.commons.annotation.FrontViewNodeRender;
import com.perfree.commons.constant.SystemConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "动态页相关")
@Controller
public class JournalController extends BaseViewController {

    @RequestMapping(value = {"/journal/{pageIndex}",  "journal"})
    @FrontViewNodeRender
    @Operation(summary = "动态列表页")
    public String journalPage(@PathVariable(value = "pageIndex", required = false) String pageIndex, Model model) {
        model.addAttribute("url", SystemConstants.URL_JOURNAL_LIST);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("journalList.html");
    }
}
