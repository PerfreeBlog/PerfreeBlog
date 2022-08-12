package com.perfree.controller.front;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.FrontViewNodeRender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 文章归档
 * @author Perfree
 */
@Controller
public class ArchiveController extends BaseController {

    /**
     * 文章归档页
     * @return String
     */
    @RequestMapping("/archive")
    @FrontViewNodeRender
    public String index(Model model) {
        model.addAttribute("url", Constants.URL_ARCHIVE);
        return view(currentThemePage() + "/archive.html");
    }

    /**
     * 文章归档页分页处理
     * @param pageIndex 页码
     * @param model model
     * @return String
     */
    @RequestMapping("/archive/{pageIndex}")
    @FrontViewNodeRender
    public String archivePage(@PathVariable("pageIndex") int pageIndex,Model model) {
        model.addAttribute("url", Constants.URL_ARCHIVE);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + "/archive.html");
    }
}
