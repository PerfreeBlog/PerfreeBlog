package com.perfree.base;


import com.perfree.cache.OptionCacheService;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.constant.OptionConstant;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.system.api.option.dto.OptionDTO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.dromara.hutool.core.io.resource.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.File;
import java.util.Objects;

@Controller
public class BaseViewController {

    @Resource
    private OptionCacheService optionCacheService;

    /**
     * 获取当前启用的主题
     * @return String
     */
    public String currentTheme() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String previewTheme = request.getParameter(SystemConstants.PREVIEW_THEME_URL);
        if (StringUtils.isNotBlank(previewTheme)) {
            return previewTheme;
        }
        OptionDTO option = optionCacheService.getOption(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM);
        if (null == option) {
            throw new ServiceException(ErrorCode.OPTION_WEB_THEME_NOT_EXIST);
        }
        return option.getValue();
    }

    /**
     * 获取当前启用的主题所在的目录
     * @return String
     */
    public String currentThemePage() {
        return SystemConstants.THEME_BASE_DIR + currentTheme();
    }

    /**
     * 根据文件名获取主题页面具体位置
     * @return String
     */
    public String themeView(String view) {
        return themeView(view, "/static/public/exception/page.html");
    }

    /**
     * 根据文件名获取主题页面具体位置
     * @return String
     */
    public String themeView(String view, String defaultView) {
        File file = new File(SystemConstants.PROD_THEMES_PATH + SystemConstants.FILE_SEPARATOR +
                currentTheme() + SystemConstants.FILE_SEPARATOR + view);
        File devFile = getClassPathFile(SystemConstants.DEV_THEMES_PATH + SystemConstants.FILE_SEPARATOR +
                currentTheme() + SystemConstants.FILE_SEPARATOR + view);
        if (file.exists() || (devFile != null && devFile.exists())) {
            return currentThemePage() + SystemConstants.FILE_SEPARATOR + view;
        } else {
            return defaultView;
        }
    }

    private File getClassPathFile(String path) {
        try{
            return new ClassPathResource(path).getFile();
        }catch (Exception e) {
            return null;
        }
    }
}
