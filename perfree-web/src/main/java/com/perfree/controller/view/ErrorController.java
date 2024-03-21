package com.perfree.controller.view;

import com.perfree.base.BaseController;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 统一处理错误页面HTML渲染
 */
@Controller
public class ErrorController extends BaseController {
    @GetMapping(value = "/404", produces = {"text/html"})
    @Operation(summary = "404页")
    public String errorPage404() {
        return view("/404.html", "/404.html", "static/admin/pages/exception/404.html");
    }

    @GetMapping("/404")
    @ResponseBody
    @Operation(summary = "404")
    public ResponseEntity<?> error404() {
        return ResponseEntity.status(404).build();
    }

    @GetMapping(value = "/500", produces = {"text/html"})
    @Operation(summary = "500页")
    public String errorPage500() {
        return view("/500.html", "/500.html", "static/admin/pages/exception/500.html");
    }

    @GetMapping(value = "/500")
    @ResponseBody
    @Operation(summary = "500")
    public ResponseEntity<?> error500() {
        return ResponseEntity.status(500).build();
    }

    @GetMapping(value = "/403", produces = {"text/html"})
    @Operation(summary = "403页")
    public String unauthorizedPage() {
        return view("/403.html", "/403.html", "static/admin/pages/exception/403.html");
    }

    @GetMapping(value = "/403")
    @ResponseBody
    @Operation(summary = "403")
    public ResponseEntity<?> unauthorized() {
        return ResponseEntity.status(403).build();
    }
}
