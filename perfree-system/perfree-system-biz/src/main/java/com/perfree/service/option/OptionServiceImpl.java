package com.perfree.service.option;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.constant.OptionConstant;
import com.perfree.controller.auth.option.vo.OptionAddListReqVO;
import com.perfree.controller.auth.option.vo.OptionAddReqVO;
import com.perfree.convert.option.OptionConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.mapper.OptionMapper;
import com.perfree.model.Option;
import com.perfree.system.api.option.dto.OptionDTO;
import com.perfree.theme.ThemeManager;
import com.perfree.theme.commons.ThemeInfo;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class OptionServiceImpl extends ServiceImpl<OptionMapper, Option> implements OptionService {

    @Value("${version}")
    private String version;

    @Resource
    private OptionMapper optionMapper;

    @Resource
    private OptionCacheService optionCacheService;

    @Resource
    private ThemeManager themeManager;

    @Override
    @Transactional
    public Boolean updateOptionByKeyAndIdentification(String key,String identification, String value) {
        Option option = optionMapper.getByKeyAndIdentification(key, identification);
        if (null == option) {
            return false;
        }
        option.setValue(value);
        optionMapper.updateById(option);
        optionCacheService.putOption(option.getKey(), option.getIdentification(), OptionConvert.INSTANCE.convertModelToDTO(option));
        return true;
    }

    @Override
    @Transactional
    public Boolean saveOptionList(OptionAddListReqVO optionAddListReqVO) {
        if (optionAddListReqVO.getOptions().isEmpty()) {
            return true;
        }
        List<Option> optionList = OptionConvert.INSTANCE.convertModelListByAddList(optionAddListReqVO.getOptions());
        optionMapper.delByIdentification(optionList.get(0).getIdentification());
        optionMapper.insertBatch(optionList);
        for (Option option : optionList) {
            optionCacheService.putOption(option.getKey(), option.getIdentification(), OptionConvert.INSTANCE.convertModelToDTO(option));
        }
        return true;
    }

    @Override
    public List<Option> getOptionByIdentification(String identification) {
        return optionMapper.getSettingValueByIdentification(identification);
    }

    @Override
    public void initOptionCache() {
        List<Option> optionList = optionMapper.selectList();
        List<OptionDTO> options = OptionConvert.INSTANCE.convertCacheDTO(optionList);
        for (OptionDTO option : options) {
            optionCacheService.putOption(option.getKey(), option.getIdentification(), option);
        }
    }

    @Override
    public List<Option> getCurrentThemeSettingValue() {
        ThemeInfo themeInfo = themeManager.getThemeInfo(null);
        if (null == themeInfo) {
            throw new ServiceException(ErrorCode.GET_CURRENT_THEME_ERROR);
        }
        return optionMapper.getSettingValueByIdentification(SystemConstants.THEME_OPTION_IDENT_PRE + themeInfo.getName());
    }

    @Override
    @Transactional
    public Boolean saveCurrentThemeSetting(OptionAddListReqVO optionAddListReqVO) {
        ThemeInfo themeInfo = themeManager.getThemeInfo(null);
        if (null == themeInfo) {
            throw new ServiceException(ErrorCode.GET_CURRENT_THEME_ERROR);
        }

        List<Option> optionList = new ArrayList<>();
        for (OptionAddReqVO optionAddReqVO : optionAddListReqVO.getOptions()) {
            Option option = OptionConvert.INSTANCE.convertByAddReqVO(optionAddReqVO);
            option.setIdentification(SystemConstants.THEME_OPTION_IDENT_PRE + themeInfo.getName());
            optionList.add(option);
        }
        optionMapper.delByIdentification(SystemConstants.THEME_OPTION_IDENT_PRE + themeInfo.getName());
        optionMapper.insertBatch(optionList);
        for (Option option : optionList) {
            optionCacheService.putOption(option.getKey(),option.getIdentification(), OptionConvert.INSTANCE.convertModelToDTO(option));
        }
        return true;
    }

    @Override
    @Transactional
    public void removeOptionByIdentification(String identification) {
        List<Option> optionList = optionMapper.getSettingValueByIdentification(identification);
        if (null == optionList || optionList.isEmpty()) {
            return;
        }
        optionMapper.delByIdentification(identification);
        for (Option option : optionList) {
            optionCacheService.removeOption(option.getKey(),option.getIdentification());
        }
    }

    @Override
    public Option getOptionByIdentificationAndKey(String identification, String key) {
        return optionMapper.getOptionByIdentificationAndKey(identification, key);
    }

    @Override
    public void handleWebVersion() {
        Option optionByIdentificationAndKey = getOptionByIdentificationAndKey(OptionConstant.OPTION_IDENTIFICATION_SYSTEM, OptionEnum.WEB_VERSION.getKey());
        if (null == optionByIdentificationAndKey) {
            Option option = new Option();
            option.setTitle("当前版本");
            option.setKey(OptionEnum.WEB_VERSION.getKey());
            option.setIdentification(OptionConstant.OPTION_IDENTIFICATION_SYSTEM);
            option.setValue(version);
            optionMapper.insert(option);
            optionCacheService.putOption(option.getKey(),option.getIdentification(), OptionConvert.INSTANCE.convertModelToDTO(option));
        } else {
            optionByIdentificationAndKey.setValue(version);
            optionMapper.updateById(optionByIdentificationAndKey);
            optionCacheService.putOption(optionByIdentificationAndKey.getKey(),optionByIdentificationAndKey.getIdentification(), OptionConvert.INSTANCE.convertModelToDTO(optionByIdentificationAndKey));
        }

    }

    @Override
    public Option saveOption(Option option) {
        optionMapper.insert(option);
        optionCacheService.putOption(option.getKey(),option.getIdentification(), OptionConvert.INSTANCE.convertModelToDTO(option));
        return option;
    }
}
