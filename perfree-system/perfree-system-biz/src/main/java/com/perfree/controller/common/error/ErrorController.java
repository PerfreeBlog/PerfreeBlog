package com.perfree.controller.common.error;

import com.perfree.commons.common.CommonResult;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "系统错误接口")
public class ErrorController {
    @GetMapping("/404")
    @ResponseBody
    public CommonResult<String> error404(){
        return CommonResult.error(HttpStatus.NOT_FOUND.value(), "请求资源不存在");
    }

    @GetMapping("/500")
    @ResponseBody
    public CommonResult<String> error500(){
        return CommonResult.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), "系统出现错误,请联系管理员");
    }

    @GetMapping("/403")
    @ResponseBody
    public CommonResult<String> error403(){
        return CommonResult.error(HttpStatus.FORBIDDEN.value(), "无权访问");
    }
}
