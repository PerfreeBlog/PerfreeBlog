package com.perfree.service.option;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.model.Option;
import com.perfree.controller.api.option.vo.OptionCreateOrUpdateReqVO;

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

}
