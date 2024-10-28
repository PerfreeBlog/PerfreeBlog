package com.perfree.service.adminHome;

import cn.hutool.core.net.Ipv4Util;
import cn.hutool.core.net.NetUtil;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.utils.ArithmeticUtils;
import com.perfree.constant.OptionConstant;
import com.perfree.controller.auth.adminHome.vo.*;
import com.perfree.enjoy.directive.commons.vo.DirectiveStatisticVO;
import com.perfree.enums.OptionEnum;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginInfoHolder;
import com.perfree.service.attach.AttachService;
import com.perfree.service.common.CommonService;
import com.perfree.service.plugins.PluginsService;
import com.perfree.service.user.UserService;
import com.perfree.system.api.option.dto.OptionDTO;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.software.os.FileSystem;
import oshi.software.os.OSFileStore;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class AdminHomeServiceImpl implements AdminHomeService {

    @Value("${version}")
    private String version;

    @Resource
    private UserService userService;

    @Resource
    private AttachService attachService;

    @Resource
    private PluginsService pluginsService;

    @Resource
    private CommonService commonService;

    @Resource
    private OptionCacheService optionCacheService;


    @Override
    public ServerInfoRespVO getServerInfo() {
        ServerInfoRespVO serverInfoRespVO = new ServerInfoRespVO();
        SystemInfo si = new SystemInfo();
        // 服务器信息
        Properties props = System.getProperties();
        OptionDTO option = optionCacheService.getOption(OptionEnum.WEB_THEME.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM);
        String theme = "";
        if (null != option) {
            theme = option.getValue();
        }

        List<String> pluginList = new ArrayList<>();
        for (PluginInfo pluginInfo : PluginInfoHolder.getAllPluginInfo()) {
            pluginList.add(pluginInfo.getPluginConfig().getPlugin().getName());
        }
        SysInfoRespVO sysInfoRespVO = SysInfoRespVO.builder()
                .computerName(NetUtil.getLocalHostName())
                .computerIp(NetUtil.getLocalhostStr())
                .osName(props.getProperty("os.name"))
                .osArch(props.getProperty("os.arch"))
                .userDir(props.getProperty("user.dir"))
                .version(version)
                .theme(theme)
                .pluginList(pluginList)
                .build();
        serverInfoRespVO.setSysInfo(sysInfoRespVO);

        // JVM信息
        JvmInfoRespVO jvmInfoRespVO = JvmInfoRespVO.builder()
                .max(Runtime.getRuntime().maxMemory())
                .total(Runtime.getRuntime().totalMemory())
                .free(Runtime.getRuntime().freeMemory())
                .version(props.getProperty("java.version"))
                .home(props.getProperty("java.home"))
                .build();
        serverInfoRespVO.setJvmInfo(jvmInfoRespVO);

        // 磁盘信息
        FileSystem fileSystem = si.getOperatingSystem().getFileSystem();
        OSFileStore[] fsArray = fileSystem.getFileStores().toArray(new OSFileStore[0]);
        List<SysFileInfoRespVO> sysFileInfoRespVOList = new ArrayList<>();
        for (OSFileStore fs : fsArray) {
            long free = fs.getUsableSpace();
            long total = fs.getTotalSpace();
            long used = total - free;
            SysFileInfoRespVO sysFileInfoRespVO = SysFileInfoRespVO.builder()
                    .dirName(fs.getMount())
                    .sysTypeName(fs.getType())
                    .total(ArithmeticUtils.convertFileSize(total))
                    .free(ArithmeticUtils.convertFileSize(free))
                    .used(ArithmeticUtils.convertFileSize(used))
                    .usage(ArithmeticUtils.mul(ArithmeticUtils.div(used, total, 4), 100))
                    .build();
            sysFileInfoRespVOList.add(sysFileInfoRespVO);
        }
        serverInfoRespVO.setSysFileInfoList(sysFileInfoRespVOList);
        return serverInfoRespVO;
    }

    @Override
    public HomeStatisticRespVO getHomeStatistic() {
        HomeStatisticRespVO homeStatisticRespVO = attachService.getTypeCount();
        if (null == homeStatisticRespVO) {
            homeStatisticRespVO = new HomeStatisticRespVO();
        }
        homeStatisticRespVO.setUserTotal(userService.getTotalUser());
        homeStatisticRespVO.setAttachTotal(attachService.getTotalAttach());
        homeStatisticRespVO.setInstallPluginTotal(pluginsService.getTotalPlugins());
        homeStatisticRespVO.setRunningPluginTotal((long) PluginInfoHolder.getAllPluginInfo().size());
        DirectiveStatisticVO directiveStatisticVO = commonService.queryStatistics();
        homeStatisticRespVO.setArticleTotal(directiveStatisticVO.getArticleCount());
        homeStatisticRespVO.setCategoryTotal(directiveStatisticVO.getCategoryCount());
        homeStatisticRespVO.setTagTotal(directiveStatisticVO.getTagCount());
        homeStatisticRespVO.setCommentTotal(directiveStatisticVO.getCommentCount());
        homeStatisticRespVO.setJournalTotal(directiveStatisticVO.getJournalCount());
        return homeStatisticRespVO;
    }
}
