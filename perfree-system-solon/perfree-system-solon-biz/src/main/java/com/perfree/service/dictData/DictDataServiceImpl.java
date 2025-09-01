package com.perfree.service.dictData;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.DictDataCacheService;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.constant.DictConstant;
import com.perfree.controller.auth.dictData.vo.*;
import com.perfree.convert.dictData.DictDataConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.mapper.DictDataMapper;
import com.perfree.model.DictData;
import com.perfree.system.api.dictData.dto.DictDataDTO;
import jakarta.annotation.Resource;
import org.apache.ibatis.solon.annotation.Db;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.noear.solon.data.annotation.Transaction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * @description 数据字典值 ServiceImpl
 * @author Perfree
 **/
@Component
public class DictDataServiceImpl extends ServiceImpl<DictDataMapper, DictData> implements DictDataService {

    @Inject
    private DictDataMapper dictDataMapper;

    @Inject
    private DictDataCacheService dictDataCacheService;


    @Override
    public PageResult<DictData> dictDataPage(DictDataPageReqVO pageVO) {
        return dictDataMapper.selectPage(pageVO);
    }

    @Override
    @Transaction
    public DictData add(DictDataAddReqVO dictDataAddReqVO) {
        DictData queryDictData = dictDataMapper.queryByDictType(dictDataAddReqVO.getDictType());
        if (null != queryDictData) {
            throw new ServiceException(ErrorCode.DICT_DATA_EXIST);
        }
        DictData dictData = DictDataConvert.INSTANCE.convertAddReqVO(dictDataAddReqVO);
        dictDataMapper.insert(dictData);
        dictDataCacheService.putDictData(dictData.getDictType(),  DictDataConvert.INSTANCE.convertToDTO(dictData));
        return dictData;
    }

    @Override
    @Transaction
    public DictData update(DictDataUpdateReqVO dictDataUpdateReqVO) {
        DictData queryDictData = dictDataMapper.queryByDictType(dictDataUpdateReqVO.getDictType());
        if (null != queryDictData && !queryDictData.getId().equals(dictDataUpdateReqVO.getId())) {
            throw new ServiceException(ErrorCode.DICT_DATA_EXIST);
        }
        DictData dictData = DictDataConvert.INSTANCE.convertUpdateReqVO(dictDataUpdateReqVO);
        dictDataMapper.updateById(dictData);
        dictDataCacheService.putDictData(dictData.getDictType(),  DictDataConvert.INSTANCE.convertToDTO(dictData));
        return dictData;
    }

    @Override
    public DictData get(Integer id) {
        return dictDataMapper.selectById(id);
    }

    @Override
    @Transaction
    public Boolean del(Integer id) {
        DictData dictData = dictDataMapper.selectById(id);
        dictDataMapper.deleteById(id);
        dictDataCacheService.removeDictData(dictData.getDictType());
        return true;
    }

    @Override
    public List<DictData> listAll() {
        return dictDataMapper.listAll();
    }

    @Override
    public void initDictDataCache() {
        List<DictData> dictDataList = dictDataMapper.listByStatus(DictConstant.DICT_STATUS_ENABLE);
        List<DictDataDTO> dictDataDTOList =  DictDataConvert.INSTANCE.convertToDTOList(dictDataList);
        for (DictDataDTO dictDataDTO : dictDataDTOList) {
            dictDataCacheService.putDictData(dictDataDTO.getDictType(), dictDataDTO);
        }
    }
}
