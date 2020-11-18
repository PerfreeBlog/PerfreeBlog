package com.perfree.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Pager;
import com.perfree.mapper.AttachMapper;
import com.perfree.model.Attach;
import com.perfree.model.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Date;
import java.util.List;

@Service
public class AttachService {
    @Value("${web.upload-path}")
    private String uploadPath;
    private final Logger logger = LoggerFactory.getLogger(AttachService.class);
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

    /**
     * 根据id获取附件信息
     * @param id id
     * @return Attach
     */
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
            File file = new File(uploadPath + res.getPath());
            if (file.exists()) {
                boolean delete = file.delete();
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
