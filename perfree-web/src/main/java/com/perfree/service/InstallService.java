package com.perfree.service;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.db.sql.SqlExecutor;
import cn.hutool.setting.dialect.Props;
import com.perfree.common.OptionCache;
import com.perfree.config.DynamicDataSource;
import com.perfree.mapper.OptionMapper;
import com.perfree.model.Database;
import com.perfree.model.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.File;
import java.sql.Connection;
import java.util.List;

@Service
public class InstallService {

    @Autowired
    private OptionMapper optionMapper;

    public void addDatabase(Database database) throws Exception{
        String format = "jdbc:mysql://%s:%s/perfree?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&useSSL=false";
        String url = String.format(format, database.getAddress(), database.getPort());
        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url(url);
        dataSourceBuilder.username(database.getUserName());
        dataSourceBuilder.password(database.getPassword());
        dataSourceBuilder.driverClassName("com.mysql.jdbc.Driver");
        DataSource dataSource = dataSourceBuilder.build();
        DynamicDataSource.setDataSource(dataSource);
        Connection connection = dataSource.getConnection();
        File sqlFile = new File("resources/Perfree.sql");
        if (!sqlFile.exists()){
            sqlFile = FileUtil.file("Perfree.sql");
        }
        FileReader fileReader = new FileReader(sqlFile);
        String createSql = fileReader.readString();

        String[] split = createSql.split(";");
        for (int i = 0; i < split.length - 1; i++){
            SqlExecutor.execute(connection, split[i]);
        }
        File file = new File("resources/db.properties");
        Props setting = new Props(FileUtil.touch(file), CharsetUtil.CHARSET_UTF_8);
        setting.setProperty("url",url);
        setting.setProperty("username",database.getUserName());
        setting.setProperty("password",database.getPassword());
        setting.setProperty("driverClassName","com.mysql.jdbc.Driver");
        setting.setProperty("installStatus","dbSuccess");
        setting.store(file.getAbsolutePath());

        List<Option> options = optionMapper.getStartOption();
        options.forEach(r -> OptionCache.setOption(r.getKey(), r.getValue()));
    }
}
