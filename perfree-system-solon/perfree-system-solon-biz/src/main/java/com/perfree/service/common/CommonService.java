package com.perfree.service.common;

import com.perfree.controller.common.system.vo.InitWebReqVO;
import com.perfree.enjoy.directive.commons.vo.DirectiveStatisticVO;

public interface CommonService {

    /**
     * 统计信息
     * @return DirectiveStatisticVO
     */
    DirectiveStatisticVO queryStatistics();

    Boolean initWeb(InitWebReqVO reqVO);

}
