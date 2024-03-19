package com.perfree.service;

import com.perfree.model.Comment;
import com.perfree.model.User;

/**
 * @description MailService
 * @author Perfree
 * @date 2021/11/15 10:20
 */
public interface MailService {

    /**
     * @description 发送邮件
     * @param  comment comment
     * @author Perfree
     */
    void commentMailSend(Comment comment);

    /**
     * @description 密码
     * @author Perfree
     */
    void passwordMail(User user, String random) throws Exception;

    /**
     * 发送邮件
     */
    boolean sendMail(String mail,String content, String title) throws Exception;
}
