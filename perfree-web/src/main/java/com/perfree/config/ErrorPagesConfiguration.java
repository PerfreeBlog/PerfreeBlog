package com.perfree.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ErrorPagesConfiguration {
    @Bean
    public CustomErrorPageRegistrar errorPageRegistrar(){
        return new CustomErrorPageRegistrar();
    }
}
