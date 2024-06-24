package com.perfree.base;


import com.perfree.cache.OptionCacheService;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.system.api.option.dto.OptionCacheDTO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

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
        OptionCacheDTO option = optionCacheService.getOption(OptionEnum.WEB_THEME.getKey());
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
        return currentThemePage() + SystemConstants.FILE_SEPARATOR + view;
    }
}
