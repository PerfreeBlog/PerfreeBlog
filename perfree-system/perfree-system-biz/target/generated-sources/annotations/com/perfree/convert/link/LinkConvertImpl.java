package com.perfree.convert.link;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.link.vo.LinkAddReqVO;
import com.perfree.controller.auth.link.vo.LinkRespVO;
import com.perfree.controller.auth.link.vo.LinkUpdateReqVO;
import com.perfree.model.Link;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:59+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class LinkConvertImpl implements LinkConvert {

    @Override
    public PageResult<LinkRespVO> convertPageResultVO(PageResult<Link> linkPageResult) {
        if ( linkPageResult == null ) {
            return null;
        }

        PageResult<LinkRespVO> pageResult = new PageResult<LinkRespVO>();

        pageResult.setList( linkListToLinkRespVOList( linkPageResult.getList() ) );
        pageResult.setTotal( linkPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public LinkRespVO convertRespVO(Link link) {
        if ( link == null ) {
            return null;
        }

        LinkRespVO linkRespVO = new LinkRespVO();

        linkRespVO.setName( link.getName() );
        linkRespVO.setLogo( link.getLogo() );
        linkRespVO.setDesc( link.getDesc() );
        linkRespVO.setAddress( link.getAddress() );
        linkRespVO.setId( link.getId() );
        if ( link.getCreateTime() != null ) {
            linkRespVO.setCreateTime( Date.from( link.getCreateTime().toInstant( ZoneOffset.UTC ) ) );
        }
        if ( link.getUpdateTime() != null ) {
            linkRespVO.setUpdateTime( Date.from( link.getUpdateTime().toInstant( ZoneOffset.UTC ) ) );
        }

        return linkRespVO;
    }

    @Override
    public Link convertAddReqVOToModel(LinkAddReqVO linkAddReqVO) {
        if ( linkAddReqVO == null ) {
            return null;
        }

        Link link = new Link();

        link.setName( linkAddReqVO.getName() );
        link.setLogo( linkAddReqVO.getLogo() );
        link.setDesc( linkAddReqVO.getDesc() );
        link.setAddress( linkAddReqVO.getAddress() );

        return link;
    }

    @Override
    public Link convertUpdateReqVOToModel(LinkUpdateReqVO linkUpdateReqVO) {
        if ( linkUpdateReqVO == null ) {
            return null;
        }

        Link link = new Link();

        link.setId( linkUpdateReqVO.getId() );
        link.setName( linkUpdateReqVO.getName() );
        link.setLogo( linkUpdateReqVO.getLogo() );
        link.setDesc( linkUpdateReqVO.getDesc() );
        link.setAddress( linkUpdateReqVO.getAddress() );

        return link;
    }

    protected List<LinkRespVO> linkListToLinkRespVOList(List<Link> list) {
        if ( list == null ) {
            return null;
        }

        List<LinkRespVO> list1 = new ArrayList<LinkRespVO>( list.size() );
        for ( Link link : list ) {
            list1.add( convertRespVO( link ) );
        }

        return list1;
    }
}
