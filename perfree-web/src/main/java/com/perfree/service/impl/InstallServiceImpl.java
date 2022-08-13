package com.perfree.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.db.Entity;
import cn.hutool.db.ds.druid.DruidDSFactory;
import cn.hutool.db.ds.simple.SimpleDataSource;
import cn.hutool.db.handler.EntityListHandler;
import cn.hutool.db.sql.SqlExecutor;
import cn.hutool.setting.dialect.Props;
import com.alibaba.druid.pool.DruidConnectionHolder;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import com.alibaba.druid.util.DruidDataSourceUtils;
import com.perfree.commons.Constants;
import com.perfree.commons.DynamicDataSource;
import com.perfree.controller.admin.InstallController;
import com.perfree.model.Database;
import com.perfree.model.Plugin;
import com.perfree.permission.AdminMenuGroup;
import com.perfree.permission.MenuManager;
import com.perfree.plugin.PluginManagerService;
import com.perfree.service.InstallService;
import com.perfree.service.MenuService;
import com.perfree.service.OptionService;
import com.perfree.service.PluginService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.util.List;

@Service
public class InstallServiceImpl implements InstallService {
    private final static Logger LOGGER = LoggerFactory.getLogger(InstallServiceImpl.class);
    @Autowired
    private OptionService optionService;
    @Autowired
    private MenuService menuService;
    @Autowired
    private PluginService pluginService;

    @Value("${version}")
    private String version;

    @Autowired
    private PluginManagerService pluginManagerService;

    private static final int INSTALL_DATABASE_RESULT_SUCCESS = 200;
    private static final int INSTALL_DATABASE_RESULT_EXIST = -1;
    private static final int INSTALL_DATABASE_RESULT_SKIP = -2;
    /** 初始化数据库类型:正常 */
    private static final int INIT_INSTALL_DATABASE_TYPE_NORMAL = 1;
    /** 初始化数据库类型:跳过 */
    private static final int INIT_INSTALL_DATABASE_TYPE_SKIP = 2;

    public int addDatabase(Database database) throws Exception{
        DruidDataSource druidDataSource = DynamicDataSource.getDataSource();
        if (druidDataSource.isInited()){
            druidDataSource.close();
            druidDataSource = new DruidDataSource();
        }
        File file = new File(Constants.DB_PROPERTIES_PATH);
        Props setting = new Props(FileUtil.touch(file), CharsetUtil.CHARSET_UTF_8);
        File sqlFile = new File("resources/Perfree.sql");
        if (!sqlFile.exists()){
            sqlFile = FileUtil.file("Perfree.sql");
        }
        String url = "";
        // mysql
        if (database.getType().equals("mysql")) {
            String format = "jdbc:mysql://%s:%s/%s?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";
            if (StringUtils.isBlank(database.getDataBaseName())) {
                database.setDataBaseName("perfree");
            }
            url = String.format(format, database.getAddress(), database.getPort(), database.getDataBaseName());
            druidDataSource.setUrl(url);
            druidDataSource.setUsername(database.getUserName());
            druidDataSource.setPassword(database.getPassword());
            druidDataSource.setDriverClassName("com.mysql.jdbc.Driver");
            setting.setProperty("url",url);
            setting.setProperty("username",database.getUserName());
            setting.setProperty("password",database.getPassword());
            setting.setProperty("driverClassName","com.mysql.jdbc.Driver");
            setting.setProperty("type","mysql");
        }
        // sqlite
        if (database.getType().equals("sqlite")){
            url = "jdbc:sqlite:resources/db/perfree.db?date_string_format=yyyy-MM-dd HH:mm:ss";
            druidDataSource.setUrl(url);
            druidDataSource.setDriverClassName("org.sqlite.JDBC");
            initSqliteFile("resources/db/perfree.db");
            sqlFile = new File("resources/Perfree-sqlite.sql");
            if (!sqlFile.exists()){
                sqlFile = FileUtil.file("Perfree-sqlite.sql");
            }
            setting.setProperty("url",url);
            setting.setProperty("driverClassName","org.sqlite.JDBC");
            setting.setProperty("type","sqlite");
        }

        SimpleDataSource ds = new SimpleDataSource(url, database.getUserName(), database.getPassword());
        Connection connection = null;
        try{
            connection = ds.getConnection();
            // 检测数据库是否存在
            if (database.getType().equals("mysql")) {
                List<Entity> entityList = SqlExecutor.query(connection, "select count(1) tableNumber from information_schema.TABLES WHERE table_schema = ?",
                        new EntityListHandler(), database.getDataBaseName());
                if (entityList != null && entityList.size() > 0 && entityList.get(0).getInt("tableNumber") > 0
                        && database.getInstallType() == INIT_INSTALL_DATABASE_TYPE_NORMAL){
                    return INSTALL_DATABASE_RESULT_EXIST;
                }
            }

            if(database.getInstallType() == INIT_INSTALL_DATABASE_TYPE_SKIP) {
                setting.setProperty("installStatus","dbSuccess");
                installInitOperate(setting, file);
                return INSTALL_DATABASE_RESULT_SKIP;
            }
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("数据库连接失败:{}", e.getMessage());
            throw new Exception("数据库连接失败");
        } finally {
            if (connection != null) {
                connection.close();
            }
            ds.close();
        }
        DynamicDataSource.setDataSource(druidDataSource, setting.getStr("type"));
        connection = druidDataSource.getConnection();
        FileReader fileReader = new FileReader(sqlFile);
        String createSql = fileReader.readString();
        String[] split = createSql.split(";");
        for (int i = 0; i < split.length - 1; i++){
            connection.prepareStatement(split[i]).execute();
        }
        connection.close();
        setting.setProperty("installStatus","dbSuccess");
        setting.setProperty("dataVersion", version);
        installInitOperate(setting, file);
        return INSTALL_DATABASE_RESULT_SUCCESS;
    }

    /**
     * @description 初始化
     * @author Perfree
     */
    private void installInitOperate(Props setting, File file) throws Exception {
        setting.store(file.getAbsolutePath());
        optionService.initOptionCache();
        List<AdminMenuGroup> adminMenuGroups = MenuManager.initSystemMenu();
        menuService.initSystemMenu(adminMenuGroups);
        try{
            List<Plugin> plugins = pluginService.getAll();
            pluginManagerService.initPlugins(plugins);
        }catch (Exception e) {
            e.printStackTrace();
        }
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
