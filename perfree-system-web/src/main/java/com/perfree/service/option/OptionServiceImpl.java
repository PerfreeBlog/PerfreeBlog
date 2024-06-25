package com.perfree.service.option;

import com.perfree.cache.OptionCacheService;
import com.perfree.convert.option.OptionConvert;
import com.perfree.mapper.OptionMapper;
import com.perfree.model.Option;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Resource
    private OptionMapper optionMapper;

    @Resource
    private OptionCacheService optionCacheService;

    @Override
    public List<Option> getAllOption() {
        return optionMapper.selectList();
    }

    @Override
    @Transactional
    public Boolean updateOptionByKey(String key, String value) {
        Option option = optionMapper.getByKey(key);
        if (null == option) {
            return false;
        }
        option.setValue(value);
        optionMapper.updateById(option);
        optionCacheService.putOption(option.getKey(), OptionConvert.INSTANCE.convertModelToDTO(option));
        return true;
    }
}
