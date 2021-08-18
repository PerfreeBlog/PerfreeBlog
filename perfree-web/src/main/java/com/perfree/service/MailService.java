package com.perfree.service;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.text.StrFormatter;
import com.perfree.common.OptionCacheUtil;
import com.perfree.model.Article;
import com.perfree.model.Comment;
import com.perfree.model.User;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * @description 邮件服务
 * @author Perfree
 * @date 2021/8/10 9:27
 */
@Service
public class MailService {
    private static JavaMailSenderImpl javaMailSender;
    private final static Logger LOGGER = LoggerFactory.getLogger(MailService.class);
    @Autowired
    private ArticleService articleService;
    @Autowired
    private CommentService commentService;

    /** 
     * @description 发送邮件
     * @param  comment comment
     * @author Perfree
     */
    @Async
    public void commentMailSend(Comment comment){
        try {
            if (OptionCacheUtil.getValue("COMMENT_IS_SEND_MAIL").equals("0")) {
                return;
            }
            setJavaMailSender();
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setFrom(OptionCacheUtil.getValue("SMTP_EMAIL"));
            if (comment.getPid() != -1) {
                Comment parentComment = commentService.getById(comment.getPid());
                if (!parentComment.getEmail().equals(OptionCacheUtil.getValue("SMTP_EMAIL"))) {
                    helper.setTo(parentComment.getEmail());
                    commentMailContent(comment, helper);
                    javaMailSender.send(message);
                }
            }
            if (!comment.getEmail().equals(OptionCacheUtil.getValue("SMTP_EMAIL"))){
                helper.setTo(OptionCacheUtil.getValue("SMTP_EMAIL"));
                commentMailContent(comment, helper);
                javaMailSender.send(message);
            }
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("邮箱服务出错:{}", e.getMessage());
        }
    }

    /**
     * @description  组装信息
     * @param comment comment
     * @param helper helper
     * @author Perfree
     */
    public void commentMailContent(Comment comment, MimeMessageHelper helper) throws MessagingException {
        Article article = articleService.getById(comment.getArticleId().toString());
        helper.setSubject("来自["+OptionCacheUtil.getValue("WEB_NAME")+"]站点的新消息");
        String articleAddress = OptionCacheUtil.getValue("WEB_SITE") + "/article/"+ article.getId() + "#comment-" + comment.getId();
        String html = StrFormatter.format("<div style='margin: 100px auto;background-color: #fff;width: 866px;border: 1px solid #F1F0F0;box-shadow: 0 0 5px #f1f0f0;'>\n" +
                "\t<h2 style='width: 866px;height: 78px;padding-top: 10px;padding-left: 28px;background-color: #F7F7F7;margin: 0; padding: 0;line-height: 78px;display: block;text-align: center;'>{}</h2>\n" +
                "\t<div style='padding-left: 20px;padding-right20px;'>\n" +
                "\t\t<p><span style='color: #999;font-size: 15px;width: 70px;display: inline-block;'>评论内容:</span> {}</p>\n" +
                "\t\t<p><span style='color: #999;font-size: 15px;width: 70px;display: inline-block;'>评  论  人:</span> {}</p>\n" +
                "\t\t<p><span style='color: #999;font-size: 15px;width: 70px;display: inline-block;'>文章地址:</span> <a href='{}'>{}</a></p>\n" +
                "\t\t<p><span style='color: #999;font-size: 15px;width: 70px;display: inline-block;'>评论时间:</span>  {}</p>\n" +
                "\t</div>\n" +
                "</div>", OptionCacheUtil.getValue("WEB_NAME"),comment.getContent(), comment.getUserName(), articleAddress, articleAddress,DateUtil.format(comment.getCreateTime(), "YYYY-MM-dd HH:mm:ss"));
        helper.setText(html, true);
    }

    /**
     * @description 密码
     * @author Perfree
     */
    public void passwordMail(User user, String random) throws Exception {
            if (StringUtils.isBlank(OptionCacheUtil.getValue("SMTP_SERVER"))) {
                return;
            }
            setJavaMailSender();
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setFrom(OptionCacheUtil.getValue("SMTP_EMAIL"));
            helper.setTo(user.getEmail());
            helper.setSubject("来自["+OptionCacheUtil.getValue("WEB_NAME")+"]站点的新消息");
            String html = StrFormatter.format("<div style='margin: 100px auto;background-color: #fff;width: 866px;border: 1px solid #F1F0F0;box-shadow: 0 0 5px #f1f0f0;'>\n" +
                "\t<h2 style='width: 866px;height: 78px;padding-top: 10px;padding-left: 28px;background-color: #F7F7F7;margin: 0; padding: 0;line-height: 78px;display: block;text-align: center;'>{}</h2>\n" +
                "\t<div style='padding-left: 20px;padding-right20px;'>\n" +
                "\t\t<p> 您正在执行找回密码操作,验证码:{},验证码将在2分钟后失效 </p>\n" +
                "\t</div>\n" +
                "</div>", OptionCacheUtil.getValue("WEB_NAME"), random);
            helper.setText(html,true);
            javaMailSender.send(message);
    }

    /**
     * @description 设置邮件服务
     * @author Perfree
     */
    public void setJavaMailSender() {
        javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(OptionCacheUtil.getValue("SMTP_SERVER"));
        javaMailSender.setUsername(OptionCacheUtil.getValue("SMTP_EMAIL"));
        javaMailSender.setPassword(OptionCacheUtil.getValue("SMTP_AUTH"));
        javaMailSender.setDefaultEncoding("UTF-8");
        Properties properties = new Properties();
        properties.setProperty("mail.smtp.timeout", "3000");
        if (!OptionCacheUtil.getValue("SMTP_PORT").equals("25")){
            properties.setProperty("mail.smtp.auth", "true");
            properties.setProperty("mail.smtp.socketFactory.port", OptionCacheUtil.getValue("SMTP_PORT"));
            properties.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        }
        javaMailSender.setJavaMailProperties(properties);
    }
}
