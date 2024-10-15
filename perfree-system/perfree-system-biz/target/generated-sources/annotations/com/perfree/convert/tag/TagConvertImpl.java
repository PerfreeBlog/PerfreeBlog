package com.perfree.convert.tag;

import com.perfree.controller.auth.tag.vo.TagCreateReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.controller.auth.tag.vo.TagUpdateReqVO;
import com.perfree.model.Tag;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:58+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class TagConvertImpl implements TagConvert {

    @Override
    public TagRespVO convertRespVO(Tag tag) {
        if ( tag == null ) {
            return null;
        }

        TagRespVO tagRespVO = new TagRespVO();

        tagRespVO.setName( tag.getName() );
        tagRespVO.setColor( tag.getColor() );
        tagRespVO.setThumbnail( tag.getThumbnail() );
        tagRespVO.setSlug( tag.getSlug() );
        tagRespVO.setId( tag.getId() );
        if ( tag.getCreateTime() != null ) {
            tagRespVO.setCreateTime( Date.from( tag.getCreateTime().toInstant( ZoneOffset.UTC ) ) );
        }
        if ( tag.getUpdateTime() != null ) {
            tagRespVO.setUpdateTime( Date.from( tag.getUpdateTime().toInstant( ZoneOffset.UTC ) ) );
        }

        return tagRespVO;
    }

    @Override
    public Tag convertCreateReqVoToModel(TagCreateReqVO tagCreateReqVO) {
        if ( tagCreateReqVO == null ) {
            return null;
        }

        Tag tag = new Tag();

        tag.setName( tagCreateReqVO.getName() );
        tag.setColor( tagCreateReqVO.getColor() );
        tag.setThumbnail( tagCreateReqVO.getThumbnail() );
        tag.setSlug( tagCreateReqVO.getSlug() );

        return tag;
    }

    @Override
    public Tag convertUpdateReqVoToModel(TagUpdateReqVO tagUpdateReqVO) {
        if ( tagUpdateReqVO == null ) {
            return null;
        }

        Tag tag = new Tag();

        tag.setId( tagUpdateReqVO.getId() );
        tag.setName( tagUpdateReqVO.getName() );
        tag.setColor( tagUpdateReqVO.getColor() );
        tag.setThumbnail( tagUpdateReqVO.getThumbnail() );
        tag.setSlug( tagUpdateReqVO.getSlug() );

        return tag;
    }

    @Override
    public List<TagRespVO> convertRespVOList(List<Tag> list) {
        if ( list == null ) {
            return null;
        }

        List<TagRespVO> list1 = new ArrayList<TagRespVO>( list.size() );
        for ( Tag tag : list ) {
            list1.add( convertRespVO( tag ) );
        }

        return list1;
    }
}
