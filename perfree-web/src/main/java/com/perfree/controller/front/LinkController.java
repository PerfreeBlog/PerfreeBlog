package com.perfree.controller.front;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 友链
 * @author Perfree
 */
@Controller
public class LinkController extends BaseController {
    /**
     * 友链页
     * @return String
     */
    @RequestMapping("/link")
    public String index(Model model) {
        model.addAttribute("url", Constants.URL_LINK);
        return view(currentThemePage() + "/link.html");
    }

    /**
     * 友链分页处理
     * @param pageIndex 页码
     * @param model model
     * @return String
     */
    @RequestMapping("/link/{pageIndex}")
    public String archivePage(@PathVariable("pageIndex") int pageIndex, Model model) {
        model.addAttribute("url", Constants.URL_LINK);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + "/link.html");
    }
}
