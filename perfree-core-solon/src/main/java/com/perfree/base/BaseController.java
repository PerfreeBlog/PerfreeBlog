package com.perfree.base;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.convert.Convert;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.commons.common.PageParam;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import jakarta.validation.Valid;
import org.apache.poi.ss.formula.functions.T;
import org.noear.solon.annotation.Controller;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @description:
 * @author: Matuto
 * @date: 2025/9/2
 */
@Controller
public class BaseController {
    /**
     * 设置请求分页数据
     * @param page
     */
    protected void startPage(PageParam page) {
        Integer pageNumber = Convert.toInt(page.getPageNo(), 1);
        Integer pageSize = Convert.toInt(page.getPageSize());
        if (CollectionUtil.isNotEmpty(page.getSortingFields())) {
            String orderBy = page.getSortingFields().stream()
                    .map(sortingField -> sortingField.getField() +
                            (SortingField.ORDER_ASC.equals(sortingField.getOrder()) ? " ASC" : " DESC"))
                    .collect(Collectors.joining(","));
            PageHelper.startPage(pageNumber, pageSize, orderBy);
        } else {
            PageHelper.startPage(pageNumber, pageSize);
        }
    }

    /**
     * 获取分页数据
     * @param list
     * @return
     */
    protected PageResult<T> getPageData(List<T> list) {
        return new PageResult<>(list, new PageInfo<>(list).getTotal());
    }

}
