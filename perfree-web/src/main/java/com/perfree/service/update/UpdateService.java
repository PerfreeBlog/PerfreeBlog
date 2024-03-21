package com.perfree.service.update;

import com.perfree.controller.api.setting.vo.UpdateRespVO;

public interface UpdateService {
    /**
     * 检查更新
     * @return UpdateRespVO
     */
    UpdateRespVO checkUpdate();
}
