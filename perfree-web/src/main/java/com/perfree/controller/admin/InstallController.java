package com.perfree.controller.admin;

import com.perfree.config.DynamicDataSource;
import com.perfree.controller.BaseController;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.sql.DataSource;

@Controller
public class InstallController extends BaseController {

    @RequestMapping("/install")
    public String installPage() {
        return view("static/admin/pages/install/install.html");
    }

  /*  DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url("jdbc:mysql://127.0.0.1:3306/perfree?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC");
        dataSourceBuilder.username("root");
        dataSourceBuilder.password("215607..");
        dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
    DataSource dataSource = dataSourceBuilder.build();
        DynamicDataSource.setDataSource(dataSource);*/
}
