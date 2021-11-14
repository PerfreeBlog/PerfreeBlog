package com.perfree.commons;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 校验工具类
 * @author Perfree
 */
public class ValidUtil {

    /**
     * 校验是否为邮箱
     * @param string 字符串
     * @return boolean
     */
    public static boolean isEmail(String string) {
        if (string == null) {
            return false;
        }
        String regx = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
        Pattern p = Pattern.compile(regx);
        Matcher m = p.matcher(string);
        return m.matches();
    }
}
