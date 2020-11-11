package com.perfree.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.common.StringUtil;
import com.perfree.mapper.TagMapper;
import com.perfree.model.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagMapper tagMapper;

    /**
     * 管理后台标签列表
     * @param pager 搜索数据
     * @return ResponseBean
     */
    public Pager<Tag> list(Pager<Tag> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Tag> tags = tagMapper.getReportList(pager.getForm());
        PageInfo<Tag> pageInfo = new PageInfo<>(tags);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }

    /**
     * 添加标签
     * @param tag 标签
     * @return int
     */
    public int add(Tag tag) {
        tag.setCreateTime(new Date());
        return tagMapper.add(tag);
    }
}
