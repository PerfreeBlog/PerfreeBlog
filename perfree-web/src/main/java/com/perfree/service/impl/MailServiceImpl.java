package com.perfree.service.impl;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.text.StrFormatter;
import cn.hutool.http.HtmlUtil;
import com.jfinal.template.Template;
import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.config.EnjoyConfig;
import com.perfree.model.Article;
import com.perfree.model.Comment;
import com.perfree.model.User;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import com.perfree.service.MailService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.File;
import java.util.HashMap;
import java.util.Properties;

/**
 * @description 邮件服务
 * @author Perfree
 * @date 2021/8/10 9:27
 */
@Service
public class MailServiceImpl implements MailService {
    private static JavaMailSenderImpl javaMailSender;
    private final static Logger LOGGER = LoggerFactory.getLogger(MailServiceImpl.class);
    @Autowired
    private ArticleService articleService;
    @Autowired
    private CommentService commentService;

    @Value("${server.port}")
    private int serverPort;

    /** 
     * @description 发送邮件
     * @param  comment comment
     * @author Perfree
     */
    @Async
    public void commentMailSend(Comment comment){
        try {
            if (StringUtils.isBlank(OptionCacheUtil.getValue("COMMENT_IS_SEND_MAIL")) || OptionCacheUtil.getValue("COMMENT_IS_SEND_MAIL").equals("0")) {
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
    private void commentMailContent(Comment comment, MimeMessageHelper helper) throws MessagingException {
        Article article = articleService.getById(comment.getArticleId().toString());
        helper.setSubject("来自["+OptionCacheUtil.getValue("WEB_NAME")+"]站点的新消息");
        String web_site = OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_SITE, IpUtil.getUrl(serverPort));
        Template template = EnjoyConfig.jfr.getEngine().getTemplate("static/admin/tpl/comment_mail.html");
        HashMap<String, Object> param = new HashMap<>();
        param.put("comment", comment);
        param.put("article", article);
        param.put("web_site", web_site);
        String mailTHtml = template.renderToString(param);
        helper.setText(mailTHtml, true);
    }

    /**
     * @description 密码
     * @author Perfree
     */
    public void passwordMail(User user, String random) throws Exception {
        Template template = EnjoyConfig.jfr.getEngine().getTemplate("static/admin/tpl/find_password.html");
        HashMap<String, Object> param = new HashMap<>();
        String web_site = OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_SITE, IpUtil.getUrl(serverPort));
        param.put("user", user);
        param.put("random", random);
        param.put("web_site", web_site);
        String mailTHtml = template.renderToString(param);
        sendMail(user.getEmail(), mailTHtml, "来自["+OptionCacheUtil.getValue("WEB_NAME")+"]站点的新消息");
    }

    /**
     * 发送邮件
     */
    public boolean sendMail(String mail,String content, String title) throws Exception{
        if (StringUtils.isBlank(OptionCacheUtil.getValue("SMTP_SERVER"))) {
            return false;
        }
        setJavaMailSender();
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setFrom(OptionCacheUtil.getValue("SMTP_EMAIL"));
        helper.setTo(mail);
        helper.setSubject(title);
        String html = StrFormatter.format(content);
        helper.setText(html,true);
        javaMailSender.send(message);
        return true;
    }

    /**
     * @description 设置邮件服务
     * @author Perfree
     */
    private void setJavaMailSender() {
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
