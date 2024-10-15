package com.perfree.convert.extra;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.extra.vo.ExtraAddReqVO;
import com.perfree.controller.auth.extra.vo.ExtraRespVO;
import com.perfree.controller.auth.extra.vo.ExtraUpdateReqVO;
import com.perfree.model.Extra;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:58+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class ExtraConvertImpl implements ExtraConvert {

    @Override
    public ExtraRespVO convertRespVO(Extra byKey) {
        if ( byKey == null ) {
            return null;
        }

        ExtraRespVO extraRespVO = new ExtraRespVO();

        extraRespVO.setExtraName( byKey.getExtraName() );
        extraRespVO.setExtraDescription( byKey.getExtraDescription() );
        extraRespVO.setExtraKey( byKey.getExtraKey() );
        extraRespVO.setExtraData( byKey.getExtraData() );
        extraRespVO.setId( byKey.getId() );
        extraRespVO.setCreateTime( byKey.getCreateTime() );
        extraRespVO.setUpdateTime( byKey.getUpdateTime() );

        return extraRespVO;
    }

    @Override
    public PageResult<ExtraRespVO> convertPageResultVO(PageResult<Extra> extraPageResult) {
        if ( extraPageResult == null ) {
            return null;
        }

        PageResult<ExtraRespVO> pageResult = new PageResult<ExtraRespVO>();

        pageResult.setList( extraListToExtraRespVOList( extraPageResult.getList() ) );
        pageResult.setTotal( extraPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public Extra convertByAddReqVO(ExtraAddReqVO extraAddReqVO) {
        if ( extraAddReqVO == null ) {
            return null;
        }

        Extra extra = new Extra();

        extra.setExtraName( extraAddReqVO.getExtraName() );
        extra.setExtraDescription( extraAddReqVO.getExtraDescription() );
        extra.setExtraKey( extraAddReqVO.getExtraKey() );
        extra.setExtraData( extraAddReqVO.getExtraData() );

        return extra;
    }

    @Override
    public Extra convertByUpdateReqVO(ExtraUpdateReqVO extraUpdateReqVO) {
        if ( extraUpdateReqVO == null ) {
            return null;
        }

        Extra extra = new Extra();

        extra.setId( extraUpdateReqVO.getId() );
        extra.setExtraName( extraUpdateReqVO.getExtraName() );
        extra.setExtraDescription( extraUpdateReqVO.getExtraDescription() );
        extra.setExtraKey( extraUpdateReqVO.getExtraKey() );
        extra.setExtraData( extraUpdateReqVO.getExtraData() );

        return extra;
    }

    protected List<ExtraRespVO> extraListToExtraRespVOList(List<Extra> list) {
        if ( list == null ) {
            return null;
        }

        List<ExtraRespVO> list1 = new ArrayList<ExtraRespVO>( list.size() );
        for ( Extra extra : list ) {
            list1.add( convertRespVO( extra ) );
        }

        return list1;
    }
}
