package com.perfree.service.common;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.ZipUtil;
import cn.hutool.crypto.digest.DigestUtil;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.ClassPathFileUtil;
import com.perfree.constant.ArticleConstant;
import com.perfree.constant.OptionConstant;
import com.perfree.constant.UserConstant;
import com.perfree.controller.common.system.vo.InitWebReqVO;
import com.perfree.enjoy.directive.commons.vo.DirectiveStatisticVO;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.mapper.CommonMapper;
import com.perfree.mapper.UserRoleMapper;
import com.perfree.model.Article;
import com.perfree.model.Option;
import com.perfree.model.User;
import com.perfree.model.UserRole;
import com.perfree.service.article.ArticleService;
import com.perfree.service.option.OptionService;
import com.perfree.service.user.UserService;
import com.perfree.system.api.option.dto.OptionDTO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;

@Service
public class CommonServiceImpl implements CommonService{

    @Resource
    private CommonMapper commonMapper;

    @Resource
    private OptionCacheService optionCacheService;

    @Resource
    private OptionService optionService;

    @Resource
    private ArticleService articleService;

    @Resource
    private UserService userService;

    @Resource
    private UserRoleMapper  userRoleMapper;


    @Override
    public DirectiveStatisticVO queryStatistics() {
        return commonMapper.queryStatistics();
    }

    @Override
    @Transactional
    public Boolean initWeb(InitWebReqVO reqVO) {
        OptionDTO option = optionCacheService.getOption(OptionEnum.WEB_INIT.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM);
        if (null != option && option.getValue().equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
            throw new ServiceException(ErrorCode.WEB_IS_INIT);
        }
        long count = userService.count();
        if (count > 0) {
            throw new ServiceException(ErrorCode.WEB_IS_INIT);
        }

        // 存放配置信息
        genInitOption(OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, OptionEnum.WEB_NAME.getKey(), reqVO.getWebName(), OptionEnum.WEB_NAME.getMsg());
        genInitOption(OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, OptionEnum.WEB_TITLE.getKey(), reqVO.getWebTitle(), OptionEnum.WEB_TITLE.getMsg());
        // 存放用户信息
        User user = genInitAdminUser(reqVO);
        // 初始化文章
        genInitArticle(user);
        // 初始化页面
        genInitPage(user);
        // 初始化动态
        genInitJournal(user);

        // 初始化主题
        initTheme();

        genInitOption(OptionConstant.OPTION_IDENTIFICATION_SYSTEM, OptionEnum.WEB_INIT.getKey(), OptionConstant.OPTION_PUBLIC_TRUE, OptionEnum.WEB_INIT.getMsg());

        return true;
    }


    private void initTheme() {
        File file = ClassPathFileUtil.getClassPathFile("classpath:static/themes/default.zip");
        if (null == file || !file.exists()) {
            throw new ServiceException(ErrorCode.DEFAULT_THEME_NOT_EXIST);
        }
        File defaultDir = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR + "default");
        if (defaultDir.exists()) {
            FileUtil.del(defaultDir);
        }
        ZipUtil.unzip(file.getAbsoluteFile(), defaultDir.getAbsoluteFile());
    }

    private void genInitJournal(User user) {
        Article article = new Article();
        article.setContent("✨Hello world, 欢迎使用PerfreeBlog, 这是第一条动态~✨");
        article.setContentModel("journal");
        article.setType(ArticleConstant.ARTICLE_TYPE_JOURNAL);
        article.setIsComment(1);
        article.setIsTop(0);
        article.setStatus(ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        article.setParseContent("✨Hello world, 欢迎使用PerfreeBlog, 这是第一条动态~✨");
        article.setCreateUserId(user.getId());
        articleService.save(article);
    }

    private void genInitPage(User user) {
        Article article = new Article();
        article.setSummary("友情链接");
        article.setTitle("友情链接");
        article.setContent("这里可以写友链申请格式~✨");
        article.setContentModel("Vditor");
        article.setType(ArticleConstant.ARTICLE_TYPE_PAGE);
        article.setSlug("link");
        article.setIsComment(1);
        article.setIsTop(0);
        article.setStatus(ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        article.setParseContent("这里可以写友链申请格式~✨");
        article.setCreateUserId(user.getId());
        articleService.save(article);
    }

    private void genInitArticle(User user) {
        Article article = new Article();
        article.setSummary("欢迎使用PerfreeBlog, 这是一篇示例文章");
        article.setTitle("✨Hello world✨");
        article.setContent("欢迎使用PerfreeBlog, 这是一篇示例文章✨");
        article.setContentModel("Vditor");
        article.setType(ArticleConstant.ARTICLE_TYPE_ARTICLE);
        article.setSlug("hello");
        article.setIsComment(1);
        article.setIsTop(0);
        article.setStatus(ArticleConstant.ARTICLE_STATUS_PUBLISHED);
        article.setParseContent("欢迎使用PerfreeBlog, 这是一篇示例文章✨");
        article.setCreateUserId(user.getId());
        articleService.save(article);
    }

    private User genInitAdminUser(InitWebReqVO reqVO) {
        User user = new User();
        user.setSalt(IdUtil.simpleUUID());
        String hexPassword = DigestUtil.md5Hex(user.getSalt() + reqVO.getPassword());
        user.setPassword(hexPassword);
        user.setAvatar(UserConstant.DEFAULT_AVATAR);
        user.setAccount(reqVO.getAccount());
        user.setUserName(reqVO.getUsername());
        user.setEmail(reqVO.getEmail());
        userService.save(user);
        UserRole userRole = new UserRole();
        userRole.setRoleId(1);
        userRole.setUserId(user.getId());
        userRoleMapper.insert(userRole);
        return user;
    }

    private void genInitOption(String identification, String key, String value, String title) {
        Option option = new Option();
        option.setKey(key);
        option.setValue(value);
        option.setTitle(title);
        option.setIdentification(identification);
        optionService.saveOption(option);
    }
}
