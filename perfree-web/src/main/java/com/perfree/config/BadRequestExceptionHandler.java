package com.perfree.config;

import com.perfree.common.ResponseBean;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Objects;

@ControllerAdvice
public class BadRequestExceptionHandler {
    /**
     * 校验错误拦截处理
     *
     * @param exception 错误信息集合
     * @return 错误信息
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseBean validationBodyException(MethodArgumentNotValidException exception){
        BindingResult result = exception.getBindingResult();
        Objects.requireNonNull(result.getFieldError());
        return ResponseBean.fail(result.getFieldError().getDefaultMessage(), null);
    }

    /**
     * 参数类型转换错误
     *
     * @param exception 错误
     * @return 错误信息
     */
    @ExceptionHandler(HttpMessageConversionException.class)
    public ResponseBean parameterTypeException(HttpMessageConversionException exception){
        return ResponseBean.fail("类型转换错误",null);

    }
}
