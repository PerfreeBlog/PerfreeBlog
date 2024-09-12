package com.perfree.service.common;

import com.perfree.enjoy.directive.commons.vo.DirectiveStatisticVO;

public interface CommonService {

    /**
     * 统计信息
     * @return DirectiveStatisticVO
     */
    DirectiveStatisticVO queryStatistics();

}
