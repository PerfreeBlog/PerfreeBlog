package com.perfree.service.link;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.link.vo.LinkAddReqVO;
import com.perfree.controller.auth.link.vo.LinkPageReqVO;
import com.perfree.controller.auth.link.vo.LinkUpdateReqVO;
import com.perfree.convert.link.LinkConvert;
import com.perfree.mapper.LinkMapper;
import com.perfree.model.Link;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class LinkServiceImpl extends ServiceImpl<LinkMapper, Link> implements LinkService {

    @Resource
    private LinkMapper linkMapper;

    @Override
    public PageResult<Link> linkPage(LinkPageReqVO pageVO) {
        SortingFieldUtils.handleDefaultSortingField(pageVO);
        return linkMapper.linkPage(pageVO);
    }

    @Override
    @Transactional
    public Link addLink(LinkAddReqVO linkAddReqVO) {
        Link link = LinkConvert.INSTANCE.convertAddReqVOToModel(linkAddReqVO);
        linkMapper.insert(link);
        return link;
    }

    @Override
    @Transactional
    public Link updateLink(LinkUpdateReqVO linkUpdateReqVO) {
        Link link = LinkConvert.INSTANCE.convertUpdateReqVOToModel(linkUpdateReqVO);
        linkMapper.updateById(link);
        return link;
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        linkMapper.deleteById(id);
        return true;
    }
}
