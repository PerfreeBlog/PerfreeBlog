package com.perfree.config;

import com.perfree.commons.RequestAccessException;
import com.perfree.commons.ResponseBean;
import org.apache.shiro.authz.AuthorizationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Objects;

/**
 * Parameter verification exception handling
 *
 * @author Perfree
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    private final static Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Check exception interception processing
     *
     * @param exception exception
     * @return exception message
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseBean validationBodyException(MethodArgumentNotValidException exception) {
        BindingResult result = exception.getBindingResult();
        Objects.requireNonNull(result.getFieldError());
        LOGGER.error(result.getFieldError().getDefaultMessage());
        return ResponseBean.fail(result.getFieldError().getDefaultMessage(), null);
    }

    /**
     * ClassCastException handle
     *
     * @param exception exception
     * @return exception message
     */
    @ExceptionHandler(HttpMessageConversionException.class)
    public ResponseBean parameterTypeException(HttpMessageConversionException exception) {
        LOGGER.error(exception.getMessage());
        return ResponseBean.fail("ClassCastException", exception.getMessage());

    }

    @ExceptionHandler(BindException.class)
    @ResponseBody
    public ResponseBean handleBindException(Exception e) {
        List<ObjectError> list = ((BindException) e).getAllErrors();
        if (list.size() > 0) {
            LOGGER.error(list.get(0).getDefaultMessage());
            return ResponseBean.error(ResponseBean.ERROR_CODE, list.get(0).getDefaultMessage(), null);
        }
        return ResponseBean.error(ResponseBean.ERROR_CODE, "参数错误", null);
    }

    @ExceptionHandler(value = AuthorizationException.class)
    public String handleAuthorizationException() {
        return "redirect:/403";
    }

    @ExceptionHandler(value = RequestAccessException.class)
    @ResponseBody
    public ResponseBean handleRequestAccessException(RequestAccessException e) {
        return ResponseBean.error(ResponseBean.ERROR_CODE, e.getMessage(), null);
    }
}
