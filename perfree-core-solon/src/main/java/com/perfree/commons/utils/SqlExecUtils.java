package com.perfree.commons.utils;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.io.file.FileReader;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;

public class SqlExecUtils {

    /**
     * 执行sql
     * @param sqlFile sqlFile
     * @throws SQLException SQLException
     */
    public static void execSqlFile(File sqlFile) throws SQLException {
        if (!sqlFile.exists()){
            return;
        }
        FileReader fileReader = new FileReader(sqlFile.getAbsoluteFile());
        String readString = fileReader.readString();
        if (StringUtils.isBlank(readString)){
            return;
        }
        Resource resource = new FileSystemResource(sqlFile.getAbsoluteFile());
        EncodedResource encodedResource = new EncodedResource(resource, StandardCharsets.UTF_8);
        HikariDataSource hikariDataSource = SpringBeanUtil.context.getBean(HikariDataSource.class);
        ScriptUtils.executeSqlScript(hikariDataSource.getConnection(), encodedResource);
    }
}
