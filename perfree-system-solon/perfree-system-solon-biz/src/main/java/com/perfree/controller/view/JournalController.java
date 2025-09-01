package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import com.perfree.commons.annotation.FrontViewNodeRender;
import com.perfree.commons.constant.SystemConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.noear.solon.annotation.Controller;
import org.noear.solon.annotation.Mapping;
import org.noear.solon.annotation.Path;
import org.springframework.ui.Model;

@Tag(name = "动态页相关")
@Controller
public class JournalController extends BaseViewController {

    @Mapping(value = "/journal/{pageIndex}")
    @FrontViewNodeRender
    @Operation(summary = "动态列表页")
    public String journalPage(@Path(value = "pageIndex", required = false) String pageIndex, Model model) {
        model.addAttribute("url", SystemConstants.URL_JOURNAL_LIST);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("journalList.html");
    }

    @Mapping(value = "journal")
    @FrontViewNodeRender
    @Operation(summary = "动态列表页")
    public String journal(@Path(value = "pageIndex", required = false) String pageIndex, Model model) {
        model.addAttribute("url", SystemConstants.URL_JOURNAL_LIST);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("journalList.html");
    }
}
