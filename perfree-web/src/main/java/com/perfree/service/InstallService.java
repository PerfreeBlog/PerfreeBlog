package com.perfree.service;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.db.Entity;
import cn.hutool.db.handler.EntityListHandler;
import cn.hutool.db.sql.SqlExecutor;
import cn.hutool.setting.dialect.Props;
import com.perfree.common.Constants;
import com.perfree.config.DynamicDataSource;
import com.perfree.model.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.util.List;

@Service
public class InstallService {

    @Autowired
    private OptionService optionService;
    @Autowired
    private MenuService menuService;
    @Value("${version}")
    private String version;

    public boolean addDatabase(Database database) throws Exception{
        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        File file = new File(Constants.DB_PROPERTIES_PATH);
        Props setting = new Props(FileUtil.touch(file), CharsetUtil.CHARSET_UTF_8);
        File sqlFile = new File("resources/Perfree.sql");
        if (!sqlFile.exists()){
            sqlFile = FileUtil.file("Perfree.sql");
        }
        // mysql
        if (database.getType().equals("mysql")) {
            String format = "jdbc:mysql://%s:%s/perfree?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&useSSL=false";
            String url = String.format(format, database.getAddress(), database.getPort());
            dataSourceBuilder.url("jdbc:sqlite:filename");
            dataSourceBuilder.url(url);
            dataSourceBuilder.username(database.getUserName());
            dataSourceBuilder.password(database.getPassword());
            dataSourceBuilder.driverClassName("com.mysql.jdbc.Driver");
            setting.setProperty("url",url);
            setting.setProperty("username",database.getUserName());
            setting.setProperty("password",database.getPassword());
            setting.setProperty("driverClassName","com.mysql.jdbc.Driver");
            setting.setProperty("type","mysql");
        }
        // sqlite
        if (database.getType().equals("sqlite")){
            String url = "jdbc:sqlite:resources/db/perfree.db?date_string_format=yyyy-MM-dd HH:mm:ss";
            dataSourceBuilder.url(url);
            dataSourceBuilder.driverClassName("org.sqlite.JDBC");
            initSqliteFile("resources/db/perfree.db");
            sqlFile = new File("resources/Perfree-sqlite.sql");
            if (!sqlFile.exists()){
                sqlFile = FileUtil.file("Perfree-sqlite.sql");
            }
            setting.setProperty("url",url);
            setting.setProperty("driverClassName","org.sqlite.JDBC");
            setting.setProperty("type","sqlite");
        }

        DataSource dataSource = dataSourceBuilder.build();
        DynamicDataSource.setDataSource(dataSource, setting.getStr("type"));
        Connection connection = dataSource.getConnection();

        List<Entity> entityList = SqlExecutor.query(connection, "select * from p_option", new EntityListHandler());

        if (entityList != null && entityList.size() > 0 && database.getInstallType() == 1){
            setting.store(file.getAbsolutePath());
            return false;
        }
        FileReader fileReader = new FileReader(sqlFile);
        String createSql = fileReader.readString();
        String[] split = createSql.split(";");
        for (int i = 0; i < split.length - 1; i++){
            SqlExecutor.execute(connection, split[i]);
        }
        setting.setProperty("installStatus","dbSuccess");
        setting.setProperty("dataVersion", version);
        setting.store(file.getAbsolutePath());

        optionService.initOptionCache();
        menuService.registerMenuPage();
        return true;
    }

    public static void initSqliteFile(String filePath) throws Exception {
        File file = new File(filePath);

        File dir = file.getParentFile();
        if(!dir.exists()){
            if (!dir.mkdirs()) {
                throw new Exception("数据库目录创建失败");
            }
        }

        if(!file.exists()){
            try {
                if (!file.createNewFile()) {
                    throw new Exception("数据库文件创建失败");
                }
            } catch (IOException e) {
                throw new Exception("数据库文件创建失败" + e.getMessage());
            }
        }
    }
}
