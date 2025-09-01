package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.noear.solon.annotation.Controller;
import org.noear.solon.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "错误页相关")
@Controller
public class ErrorController extends BaseViewController {

    @Mapping(value = "/404")
    @Operation(summary = "404")
    public String errorPage404(){
        return "/static/public/exception/404.html";
    }

    @Mapping(value = "/500")
    @Operation(summary = "500")
    public String errorPage500(){
        return "/static/public/exception/500.html";
    }

    @Mapping(value = "/403")
    @Operation(summary = "403")
    public String errorPage403(){
        return "/static/public/exception/403.html";
    }
}
