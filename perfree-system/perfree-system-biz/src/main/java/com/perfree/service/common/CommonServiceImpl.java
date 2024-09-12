package com.perfree.service.common;

import com.perfree.enjoy.directive.commons.vo.DirectiveStatisticVO;
import com.perfree.mapper.CommonMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class CommonServiceImpl implements CommonService{

    @Resource
    private CommonMapper commonMapper;


    @Override
    public DirectiveStatisticVO queryStatistics() {
        return commonMapper.queryStatistics();
    }
}
