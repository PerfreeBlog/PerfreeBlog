package com.perfree.common;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValidUtil {

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
