package com.perfree.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Pager;
import com.perfree.mapper.AttachMapper;
import com.perfree.model.Attach;
import com.perfree.model.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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

    /**
     * 附件管理列表页
     * @param pager pager
     * @return Pager<Attach>
     */
    public Pager<Attach> list(Pager<Attach> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Attach> attaches = attachMapper.getList(pager.getForm());
        PageInfo<Attach> pageInfo = new PageInfo<>(attaches);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }
}
