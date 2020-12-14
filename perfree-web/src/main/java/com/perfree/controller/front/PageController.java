package com.perfree.controller.front;

import com.perfree.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController extends BaseController {

    @RequestMapping("/page/{pageName}")
    public String page(@PathVariable("pageName") String pageName) {
        return currentThemePage() + "/" + pageName;
    }
}
