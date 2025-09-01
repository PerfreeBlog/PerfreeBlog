package com.perfree.config;

import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.ErrorPageRegistrar;
import org.springframework.boot.web.server.ErrorPageRegistry;
import org.springframework.http.HttpStatus;

public class CustomErrorPageRegistrar implements ErrorPageRegistrar {
    @Override
    public void registerErrorPages(ErrorPageRegistry errorPageRegistry) {
        ErrorPage page404 = new ErrorPage(HttpStatus.NOT_FOUND, "/404");
        ErrorPage page500 = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/500");
        ErrorPage page403 = new ErrorPage(HttpStatus.FORBIDDEN, "/403");
        ErrorPage page405 = new ErrorPage(HttpStatus.METHOD_NOT_ALLOWED, "/404");
        errorPageRegistry.addErrorPages(page404, page500,page403,page405);
    }
}
