package com.perfree.service;

import com.perfree.mapper.AttachMapper;
import com.perfree.model.Attach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AttachService {

    @Autowired
    private AttachMapper attachMapper;

    /**
     * 新增附件
     * @param attach attach
     * @return int
     */
    public int add(Attach attach) {
        attach.setCreateTime(new Date());
        return attachMapper.add(attach);
    }
}
