package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "错误页相关")
@Controller
public class ErrorController extends BaseViewController {

    @RequestMapping(value = "/404",produces = {"text/html"})
    @Operation(summary = "404")
    public String errorPage404(){
        return "/static/public/exception/404.html";
    }

    @RequestMapping(value = "/500",produces = {"text/html"})
    @Operation(summary = "500")
    public String errorPage500(){
        return "/static/public/exception/500.html";
    }

    @RequestMapping(value = "/403",produces = {"text/html"})
    @Operation(summary = "403")
    public String errorPage403(){
        return "/static/public/exception/403.html";
    }
}
