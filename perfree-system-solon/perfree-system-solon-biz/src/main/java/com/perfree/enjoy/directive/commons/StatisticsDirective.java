package com.perfree.enjoy.directive.commons;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.service.common.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@TemplateDirective("statistics")
@Component
public class StatisticsDirective extends BaseDirective {

    private static CommonService commonService;

    @Autowired
    public void setCommonService(CommonService commonService){
        StatisticsDirective.commonService = commonService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        scope.set("statistics", commonService.queryStatistics());
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
