package com.perfree.service.link;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.link.vo.LinkAddReqVO;
import com.perfree.controller.auth.link.vo.LinkPageReqVO;
import com.perfree.controller.auth.link.vo.LinkRespVO;
import com.perfree.controller.auth.link.vo.LinkUpdateReqVO;
import com.perfree.model.Link;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface LinkService extends IService<Link> {

    /**
     * 友链分页
     * @param pageVO pageVO
     * @return PageResult<LinkRespVO>
     */
    PageResult<LinkRespVO> linkPage(LinkPageReqVO pageVO);

    /**
     * 添加友链
     * @param linkAddReqVO linkAddReqVO
     * @return Link
     */
    Link addLink(LinkAddReqVO linkAddReqVO);

    /**
     * 更新友链
     * @param linkUpdateReqVO linkUpdateReqVO
     * @return Link
     */
    Link updateLink(LinkUpdateReqVO linkUpdateReqVO);

    /**
     * 删除友链
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 根据id获取友链信息
     * @param id id
     * @return LinkRespVO
     */
    LinkRespVO getLinkById(Integer id);

}
