package com.perfree.config;

import com.perfree.common.OptionCache;
import com.perfree.mapper.OptionMapper;
import com.perfree.model.Option;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostAppRunner implements ApplicationRunner {
    private final static Logger LOGGER = LoggerFactory.getLogger(PostAppRunner.class);

    private final OptionMapper optionMapper;

    public PostAppRunner(OptionMapper optionMapper) {
        this.optionMapper = optionMapper;
    }

    @Override
    public void run(ApplicationArguments args){
        List<Option> options = optionMapper.getStartOption();
        options.forEach(r -> {
            OptionCache.setOption(r.getKey(), r.getValue());
        });
    }
}
