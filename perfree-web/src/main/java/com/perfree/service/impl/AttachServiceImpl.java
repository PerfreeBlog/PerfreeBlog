package com.perfree.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.commons.Pager;
import com.perfree.file.FileHandles;
import com.perfree.mapper.AttachMapper;
import com.perfree.model.Attach;
import com.perfree.service.AttachService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class AttachServiceImpl implements AttachService {
    private final Logger logger = LoggerFactory.getLogger(AttachServiceImpl.class);
    @Autowired
    private AttachMapper attachMapper;

    @Autowired
    private FileHandles fileHandles;

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
    @Transactional(readOnly = true)
    public Pager<Attach> list(Pager<Attach> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Attach> attaches = attachMapper.getList(pager.getForm());
        PageInfo<Attach> pageInfo = new PageInfo<>(attaches);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }

    /**
     * 根据id获取附件信息
     * @param id id
     * @return Attach
     */
    @Transactional(readOnly = true)
    public Attach getById(String id) {
        return attachMapper.getById(id);
    }

    /**
     * 删除附件
     * @param idArr idArr
     * @return int
     */
    public int del(String[] idArr) {
        List<Attach> attachList =  attachMapper.getByIdArr(idArr);
        attachList.forEach(res -> {
            try {
                fileHandles.delete(res);
            } catch (Exception e) {
                e.printStackTrace();
                logger.error("文件[{}]删除失败:{}, ", res.getName(),e.getMessage());
            }
        });
        return attachMapper.del(idArr);
    }

    /**
     * 更新附件信息
     * @param attach attach
     * @return int
     */
    public int update(Attach attach) {
        attach.setUpdateTime(new Date());
        return attachMapper.update(attach);
    }
}
