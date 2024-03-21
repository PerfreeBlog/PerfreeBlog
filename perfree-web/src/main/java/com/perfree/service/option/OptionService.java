package com.perfree.service.option;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.controller.api.option.vo.OptionQueryReqVO;
import com.perfree.model.Option;
import com.perfree.controller.api.option.vo.OptionCreateOrUpdateReqVO;

import java.util.List;

/**
 * @description OptionService
 * @author Perfree
 * @date 2021/11/15 10:23
 */
public interface OptionService extends IService<Option> {

    /**
     * 初始化配置缓存
     */
    void initOptionCache();

    /**
     * 保存或更新网站设置
     * @param optionCreateOrUpdateReqVO optionCreateOrUpdateReqVO
     */
    void saveOrUpdateSetting(OptionCreateOrUpdateReqVO optionCreateOrUpdateReqVO);

    /**
     * 获取配置(英文逗号分隔)
     * @param optionQueryReqVO optionQueryReqVO
     * @return List<Option>
     */
    List<Option> getOptions(OptionQueryReqVO optionQueryReqVO);

}
