package com.perfree.controller.auth.adminHome.vo;

import lombok.Data;

import java.util.List;

@Data
public class ServerInfoRespVO {

    private JvmInfoRespVO jvmInfo;

    private List<SysFileInfoRespVO> sysFileInfoList;

    private SysInfoRespVO sysInfo;
}
