package com.perfree.service.attachConfig;

import cn.hutool.json.JSONUtil;
import com.mybatisflex.solon.service.impl.ServiceImpl;
import com.perfree.cache.AttachConfigCacheService;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigCreateVO;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigPageReqVO;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigUpdateMasterVO;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigUpdateVO;
import com.perfree.convert.attachConfig.AttachConfigConvert;
import com.perfree.file.handle.local.FileLocalConfig;
import com.perfree.mapper.AttachConfigMapper;
import com.perfree.model.AttachConfig;
import com.perfree.system.api.attachConfig.dto.AttachConfigCacheDTO;
import jakarta.annotation.Resource;
import org.apache.ibatis.solon.annotation.Db;
import org.noear.solon.Solon;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.noear.solon.data.annotation.Transaction;
import org.noear.solon.web.staticfiles.StaticMappings;
import org.noear.solon.web.staticfiles.StaticRepository;
import org.noear.solon.web.staticfiles.repository.FileStaticRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Component
public class AttachConfigServiceImpl extends ServiceImpl<AttachConfigMapper, AttachConfig> implements AttachConfigService {

    private final static Logger LOGGER = LoggerFactory.getLogger(AttachConfigServiceImpl.class);

    @Inject
    private AttachConfigMapper attachConfigMapper;

    @Inject
    private AttachConfigCacheService attachConfigCacheService;

    @Override
    public List<AttachConfig> getAll() {
        return attachConfigMapper.getAll();
    }

    @Override
    @Transaction
    public AttachConfig add(AttachConfigCreateVO attachConfigCreateVO) {
        AttachConfig attachConfig = AttachConfigConvert.INSTANCE.convertCreateVO(attachConfigCreateVO);
        attachConfigMapper.insert(attachConfig);
        attachConfigCacheService.putAttachConfig(attachConfig.getId(), AttachConfigConvert.INSTANCE.convertCacheDTO(attachConfig));
        initLocalResourcesPatterns();
        return attachConfig;
    }

    @Override
    @Transaction
    public Boolean updateAttachConfig(AttachConfigUpdateVO attachConfigUpdateVO) {
        AttachConfig attachConfig = AttachConfigConvert.INSTANCE.convertUpdateVO(attachConfigUpdateVO);
        updateById(attachConfig);
        attachConfigCacheService.putAttachConfig(attachConfig.getId(), AttachConfigConvert.INSTANCE.convertCacheDTO(attachConfig));
        initLocalResourcesPatterns();
        return true;
    }

    @Override
    @Transaction
    public Boolean del(Integer id) {
        attachConfigMapper.deleteById(id);
        attachConfigCacheService.removeAttachConfig(id);
        initLocalResourcesPatterns();
        return true;
    }

    @Override
    public List<AttachConfig> attachConfigPage(AttachConfigPageReqVO pageVO) {
        return attachConfigMapper.attachConfigPage(pageVO);
    }

    @Override
    public Boolean updateMaster(AttachConfigUpdateMasterVO attachConfigUpdateMasterVO) {
        attachConfigMapper.clearMaster();
        attachConfigMapper.updateMaster(attachConfigUpdateMasterVO.getId());

        AttachConfigCacheDTO masterAttachConfig = attachConfigCacheService.getMasterAttachConfig();
        if (null != masterAttachConfig) {
            masterAttachConfig.setMaster(false);
            attachConfigCacheService.putAttachConfig(masterAttachConfig.getId(), masterAttachConfig);
        }

        AttachConfigCacheDTO attachConfig = attachConfigCacheService.getAttachConfig(attachConfigUpdateMasterVO.getId());
        attachConfig.setMaster(true);
        attachConfigCacheService.putAttachConfig(attachConfig.getId(), attachConfig);
        return true;
    }

    @Override
    public void initLocalResourcesPatterns() {
        List<AttachConfig> attachConfigs = attachConfigMapper.getAllLocalConfig();
        for (AttachConfig attachConfig : attachConfigs) {
            FileLocalConfig fileLocalConfig = JSONUtil.toBean(attachConfig.getConfig(), FileLocalConfig.class);
            // 统一路径分隔符
            fileLocalConfig.setBasePath(fileLocalConfig.getBasePath().replaceAll("\\\\", SystemConstants.FILE_SEPARATOR));
            if (!fileLocalConfig.getBasePath().endsWith(SystemConstants.FILE_SEPARATOR)) {
                fileLocalConfig.setBasePath(fileLocalConfig.getBasePath() + SystemConstants.FILE_SEPARATOR);
            }

            // 使用 Solon 的静态资源映射
            StaticMappings.add(SystemConstants.DEFAULT_ATTACH_URL_PATTERNS, new FileStaticRepository(fileLocalConfig.getBasePath()));
        }
    }

    @Override
    public void initAttachConfigCache() {
        List<AttachConfig> all = attachConfigMapper.getAll();
        List<AttachConfigCacheDTO> attachConfigCacheDTOS = AttachConfigConvert.INSTANCE.convertCacheListDTO(all);
        for (AttachConfigCacheDTO attachConfig : attachConfigCacheDTOS) {
            attachConfigCacheService.putAttachConfig(attachConfig.getId(), attachConfig);
        }
    }
}
