package com.perfree.commons;

public class GravatarUtil {

    public static String getGravatar(String email) {
        String emailMd5 = StringUtil.strToMd5(email);
        return "http://www.gravatar.com/avatar/"+emailMd5+"?s=32";
    }

}
