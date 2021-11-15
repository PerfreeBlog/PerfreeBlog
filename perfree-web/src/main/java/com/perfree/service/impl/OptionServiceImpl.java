package com.perfree.service.impl;

import com.perfree.commons.DynamicDataSource;
import com.perfree.mapper.OptionMapper;
import com.perfree.model.Option;
import com.perfree.service.OptionService;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
@Transactional
public class OptionServiceImpl implements OptionService {
    private static final CacheManager cacheManager = CacheManager.newInstance();
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
        if (count > 0) {
           Ehcache cache = cacheManager.getEhcache("optionData");
           cache.put(new Element(option.getKey(),option.getValue()));
        }
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
                if (DynamicDataSource.dataSourceType.equals("mysql")) {
                    count.updateAndGet(v -> v + optionMapper.addOption(o));
                } else {
                    int maxId = optionMapper.getMaxId() + 1;
                    o.setId(Long.parseLong(String.valueOf(maxId)));
                    count.updateAndGet(v -> v + optionMapper.addOptionBySqlite(o));
                }
            }
            Ehcache cache = cacheManager.getEhcache("optionData");
            cache.put(new Element(o.getKey(), o.getValue()));
        });
        return count.get();
    }

    public void initOptionCache() {
        List<Option> options = optionMapper.getStartOption();
        Ehcache cache = cacheManager.getEhcache("optionData");
        cache.removeAll();
        options.forEach(r ->  cache.put(new Element(r.getKey(),  r.getValue())));
    }
}
