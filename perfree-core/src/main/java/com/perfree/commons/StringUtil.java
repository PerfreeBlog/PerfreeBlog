package com.perfree.commons;

import cn.hutool.core.bean.BeanUtil;
import com.perfree.model.Article;
import org.apache.commons.lang3.StringUtils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.UUID;

/**
 * String字符串工具类
 * @author Perfree
 */
public class StringUtil {
    /**
     * 对象转String
     * @param str 需要转换String的对象
     * @return String
     */
    public static String toString(Object str){
        return isEmpty(str) ? "" : String.valueOf(str);
    }
    /**
     * 判断字符串对象是否为空
     * @param str 需校验字符串
     * @return boolean
     */
    public static boolean isEmpty(Object str) {
        return (str == null || "".equals(str));
    }
    /**
     * 判断字符串的长度是否大于0
     * @param str 需校验字符串
     * @return " " => true; "" => false
     */
    public static boolean hasLength(CharSequence str) {
        return (str != null && str.length() > 0);
    }

    /**
     * 判断一个字符串是否有内容
     * @param str
     * @return boolean
     */
    public static boolean hasText(String str) {
        return (hasLength((CharSequence) str) && containsText((CharSequence) str));
    }

    /**
     * 判断字符串的内容是否为空白字符
     * isWhitespace()方法用于判断指定字符是否为空白字符
     * @param str 需校验字符串
     * @return boolean
     */
    private static boolean containsText(CharSequence str) {
        int strLen = str.length();
        for (int i = 0; i < strLen; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return true;
            }
        }
        return false;
    }

    /**
     * 校验给定的字符串str是否以prefix开头，忽略大小写
     * @param str 需校验字符串
     * @param prefix 检验字符串的开头的字符串
     * @return boolean
     */
    public static boolean startsWithIgnoreCase(String str, String prefix) {
        return (str != null && prefix != null && str.length() >= prefix.length() &&
                str.regionMatches(true, 0, prefix, 0, prefix.length()));
    }

    /**
     * 校验给定的字符串str是否以suffix结尾，忽略大小写
     * @param str 需校验字符串
     * @param suffix 检验字符串的结尾的字符串
     * @return boolean
     */
    public static boolean endsWithIgnoreCase(String str, String suffix) {
        return (str != null && suffix != null && str.length() >= suffix.length() &&
                str.regionMatches(true, str.length() - suffix.length(), suffix, 0, suffix.length()));
    }

    /**
     * 判断sub在str中出现的次数
     * @param str 全字符串
     * @param sub 判断出现次数的字符串
     * @return int
     */
    public static int countOccurrencesOf(String str, String sub) {
        if (!hasLength(str) || !hasLength(sub)) {
            return 0;
        }
        int count = 0;
        int pos = 0;
        int idx;
        while ((idx = str.indexOf(sub, pos)) != -1) {
            ++count;
            pos = idx + sub.length();
        }
        return count;
    }

    /**
     * 删除给定字符串中包含有的任意字符
     * @param inString 给定字符串
     * @param charsToDelete 需要删除的字符
     * @return String
     */
    public static String deleteAny(String inString, String charsToDelete) {
        if (!hasLength(inString) || !hasLength(charsToDelete)) {
            return inString;
        }

        StringBuilder sb = new StringBuilder(inString.length());
        for (int i = 0; i < inString.length(); i++) {
            char c = inString.charAt(i);
            if (charsToDelete.indexOf(c) == -1) {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    /**
     * 获取不带下划线的uuid
     * @return String
     */
    public static String getUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * 字符串转md5
     * @param str 字符串
     * @return md5Str
     */
    public static String strToMd5(String str) {
        String md5Str = null;
        if (str != null && str.length() != 0) {
            try {
                MessageDigest md = MessageDigest.getInstance("MD5");
                md.update(str.getBytes());
                byte[] b = md.digest();
                int i;
                StringBuilder buf = new StringBuilder("");
                for (byte value : b) {
                    i = value;
                    if (i < 0)
                        i += 256;
                    if (i < 16)
                        buf.append("0");
                    buf.append(Integer.toHexString(i));
                }
                //32位
                md5Str = buf.toString();
                //16位
                //  md5Str = buf.toString().substring(8, 24);
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
        return md5Str;
    }

    public static long versionToLong(String versionStr) {
        return Long.parseLong(versionStr.replaceAll("\r\n","").replaceAll("--","")
                .replaceAll("\\.","").replace("v",""));
    }

    public static String generateOrderBy(String orderBy, String orderByWay, Object o) {
        if (StringUtils.isBlank(orderBy)) {
            return "";
        }
        String[] split = orderBy.split(",");
        Map<String, Object> stringObjectMap = BeanUtil.beanToMap(o);
        String orderType;
        if (StringUtils.isNotBlank(orderByWay) && orderByWay.equals("asc")) {
            orderType = " asc";
        } else {
            orderType = " desc";
        }
        StringBuilder orderByStringBuilder = new StringBuilder();
        orderByStringBuilder.append("order by ");
        boolean safe = true;
        for (String s : split) {
            if (!stringObjectMap.containsKey(s)) {
                safe = false;
                break;
            }
            orderByStringBuilder.append(s).append(orderType).append(",");
        }
        if (!safe) {
            return "";
        }
        String orderByStr = orderByStringBuilder.toString();
        if(orderByStr.lastIndexOf(",") == orderByStr.length() - 1) {
            orderByStr = orderByStr.substring(0, orderByStr.length()-1);
        }
        return orderByStr;
    }
}
