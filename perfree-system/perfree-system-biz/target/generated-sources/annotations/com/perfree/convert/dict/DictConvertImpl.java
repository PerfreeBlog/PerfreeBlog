package com.perfree.convert.dict;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.dict.vo.DictAddReqVO;
import com.perfree.controller.auth.dict.vo.DictRespVO;
import com.perfree.controller.auth.dict.vo.DictUpdateReqVO;
import com.perfree.model.Dict;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:59+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class DictConvertImpl implements DictConvert {

    @Override
    public DictRespVO convertRespVO(Dict dict) {
        if ( dict == null ) {
            return null;
        }

        DictRespVO dictRespVO = new DictRespVO();

        dictRespVO.setDictType( dict.getDictType() );
        dictRespVO.setStatus( dict.getStatus() );
        dictRespVO.setRemark( dict.getRemark() );
        dictRespVO.setDictName( dict.getDictName() );
        dictRespVO.setSeq( dict.getSeq() );
        dictRespVO.setId( dict.getId() );
        dictRespVO.setCreateTime( dict.getCreateTime() );

        return dictRespVO;
    }

    @Override
    public PageResult<DictRespVO> convertPageResultVO(PageResult<Dict> dictPageResult) {
        if ( dictPageResult == null ) {
            return null;
        }

        PageResult<DictRespVO> pageResult = new PageResult<DictRespVO>();

        pageResult.setList( convertListRespVO( dictPageResult.getList() ) );
        pageResult.setTotal( dictPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public Dict convertAddReqVO(DictAddReqVO dictAddReqVO) {
        if ( dictAddReqVO == null ) {
            return null;
        }

        Dict dict = new Dict();

        dict.setDictType( dictAddReqVO.getDictType() );
        dict.setStatus( dictAddReqVO.getStatus() );
        dict.setRemark( dictAddReqVO.getRemark() );
        dict.setDictName( dictAddReqVO.getDictName() );
        dict.setSeq( dictAddReqVO.getSeq() );

        return dict;
    }

    @Override
    public Dict convertUpdateReqVO(DictUpdateReqVO dictUpdateReqVO) {
        if ( dictUpdateReqVO == null ) {
            return null;
        }

        Dict dict = new Dict();

        dict.setId( dictUpdateReqVO.getId() );
        dict.setDictType( dictUpdateReqVO.getDictType() );
        dict.setStatus( dictUpdateReqVO.getStatus() );
        dict.setRemark( dictUpdateReqVO.getRemark() );
        dict.setDictName( dictUpdateReqVO.getDictName() );
        dict.setSeq( dictUpdateReqVO.getSeq() );

        return dict;
    }

    @Override
    public List<DictRespVO> convertListRespVO(List<Dict> list) {
        if ( list == null ) {
            return null;
        }

        List<DictRespVO> list1 = new ArrayList<DictRespVO>( list.size() );
        for ( Dict dict : list ) {
            list1.add( convertRespVO( dict ) );
        }

        return list1;
    }
}
