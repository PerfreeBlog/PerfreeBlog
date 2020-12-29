package com.perfree.service;

import com.perfree.common.OptionCache;
import com.perfree.mapper.OptionMapper;
import com.perfree.model.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
@Transactional
public class OptionService {
    @Autowired
    private OptionMapper optionMapper;

    /**
     * 根据key获取option
     * @param key key
     * @return Option
     */
    @Transactional(readOnly = true)
    public Option getOptionByKey(String key){
        return optionMapper.getOptionByKey(key);
    }

    /**
     * 根据key更新value
     * @param option option
     * @return int
     */
    public int updateValueByKey(Option option) {
        int count = optionMapper.updateValueByKey(option);
        initOptionCache();
        return count;
    }

    /**
     * 批量添加或更新option
     * @param options options
     * @return int
     */
    public int addOrUpdateOptions(List<Option> options) {
        AtomicReference<Integer> count = new AtomicReference<>(0);
        options.forEach(o -> {
            Option optionByKey = optionMapper.getOptionByKey(o.getKey());
            if (optionByKey != null) {
                count.updateAndGet(v -> v + optionMapper.updateValueByKey(o));
            } else {
                count.updateAndGet(v -> v + optionMapper.addOption(o));
            }
        });
        initOptionCache();
        return count.get();
    }

    public void initOptionCache() {
        List<Option> options = optionMapper.getStartOption();
        OptionCache.clear();
        options.forEach(r -> OptionCache.setOption(r.getKey(), r.getValue()));
    }
}
