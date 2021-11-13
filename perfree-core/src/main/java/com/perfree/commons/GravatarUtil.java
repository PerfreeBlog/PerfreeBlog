package com.perfree.commons;

/**
 * Gravatar头像生成工具
 * @author Perfree
 */
public class GravatarUtil {

    /**
     * 获取Gravatar头像地址
     * @param email 邮箱
     * @return String linkAddr
     */
    public static String getGravatar(String email) {
        String emailMd5 = StringUtil.strToMd5(email);
        return "http://www.gravatar.com/avatar/"+emailMd5+"?s=32";
    }

}
