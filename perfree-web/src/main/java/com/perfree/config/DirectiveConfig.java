package com.perfree.config;

import com.perfree.directive.OptionDirective;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class DirectiveConfig {
    @Autowired
    private freemarker.template.Configuration configuration;

    @Autowired
    private OptionDirective optionDirective;

    @PostConstruct
    public void shareVariable() {
        configuration.setSharedVariable("option", optionDirective);
    }
}
