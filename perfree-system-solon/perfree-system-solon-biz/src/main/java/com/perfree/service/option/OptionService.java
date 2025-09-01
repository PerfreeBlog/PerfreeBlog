package com.perfree.service.option;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.controller.auth.option.vo.OptionAddListReqVO;
import com.perfree.model.Option;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface OptionService extends IService<Option> {

    /**
     * 根据key修改value
     * @param key key
     * @param value value
     * @return Boolean
     */
    Boolean updateOptionByKeyAndIdentification(String key,String identification, String value);

    /**
     * 保存配置项
     * @param optionAddListReqVO optionAddListReqVO
     * @return Boolean
     */
    Boolean saveOptionList(OptionAddListReqVO optionAddListReqVO);

    /**
     * 根据标识获取所有配置信息
     * @param identification identification
     * @return List<Option>
     */
    List<Option> getOptionByIdentification(String identification);

    /**
     * 初始化配置缓存
     */
    void initOptionCache();

    /**
     * 获取当前启用主题的设置项的所有值
     * @return List<Option>
     */
    List<Option> getCurrentThemeSettingValue();

    /**
     * 保存主题设置
     * @param optionAddListReqVO optionThemeAddReqVO
     * @return Boolean
     */
    Boolean saveCurrentThemeSetting(OptionAddListReqVO optionAddListReqVO);

    void removeOptionByIdentification(String identification);

    Option getOptionByIdentificationAndKey(String optionIdentificationSystem, String key);

    void handleWebVersion();

    Option saveOption(Option option);

}
