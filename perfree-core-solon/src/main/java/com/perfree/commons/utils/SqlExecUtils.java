package com.perfree.commons.utils;

import cn.hutool.core.io.file.FileReader;
import com.alibaba.excel.util.StringUtils;
import org.noear.solon.data.sql.SqlUtils;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;

public class SqlExecUtils {



    /**
     * 执行sql
     * @param sqlFile sqlFile
     * @throws SQLException SQLException
     */
    public static void execSqlFile(File sqlFile) throws SQLException, IOException {
        if (!sqlFile.exists()){
            return;
        }
//        FileReader fileReader = new FileReader(sqlFile.getAbsoluteFile());
//        String readString = fileReader.readString();
//        if (StringUtils.isBlank(readString)){
//            return;
//        }
//        Resource resource = new FileSystemResource(sqlFile.getAbsoluteFile());
//        EncodedResource encodedResource = new EncodedResource(resource, StandardCharsets.UTF_8);
//        ScriptUtils.executeSqlScript(hikariDataSource.getConnection(), encodedResource);
        SqlUtils sqlUtils = SqlUtils.ofName("master");
        FileReader fileReader = new FileReader(sqlFile.getAbsoluteFile());
        String readString = fileReader.readString();
        if (StringUtils.isBlank(readString)){
            return;
        }
        // SQL语句缓存
        StringBuilder sqlBuffer = new StringBuilder();
        boolean inString = false;  // 是否在字符串内
        char stringChar = 0;      // 字符串使用的引号类型

        for (int i = 0; i < readString.length(); i++) {
            char c = readString.charAt(i);
            sqlBuffer.append(c);

            // 处理字符串
            if (c == '\'' || c == '"') {
                if (!inString) {
                    inString = true;
                    stringChar = c;
                } else if (c == stringChar) {
                    // 检查是否为转义引号
                    if (i > 0 && readString.charAt(i - 1) != '\\') {
                        inString = false;
                    }
                }
            }

            // 遇到分号且不在字符串内时执行SQL
            if (c == ';' && !inString) {
                String sql = sqlBuffer.toString().trim();
                if (sql.length() > 10) {
                    sqlUtils.sql(sql).update();
                }
                sqlBuffer.setLength(0);
            }
        }
    }
}
