package com.access.model;

import java.io.Serializable;
import java.util.Date;

public class AccessLogs implements Serializable {
    private static final long serialVersionUID = 4900274588193382127L;
    private Long id;
    private String systemInfo;
    private String systemGroup;
    private String systemType;
    private String browserVersion;
    private String browserName;
    private String browserGroup;
    private String ip;
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSystemInfo() {
        return systemInfo;
    }

    public void setSystemInfo(String systemInfo) {
        this.systemInfo = systemInfo;
    }

    public String getSystemGroup() {
        return systemGroup;
    }

    public void setSystemGroup(String systemGroup) {
        this.systemGroup = systemGroup;
    }

    public String getSystemType() {
        return systemType;
    }

    public void setSystemType(String systemType) {
        this.systemType = systemType;
    }

    public String getBrowserVersion() {
        return browserVersion;
    }

    public void setBrowserVersion(String browserVersion) {
        this.browserVersion = browserVersion;
    }

    public String getBrowserName() {
        return browserName;
    }

    public void setBrowserName(String browserName) {
        this.browserName = browserName;
    }

    public String getBrowserGroup() {
        return browserGroup;
    }

    public void setBrowserGroup(String browserGroup) {
        this.browserGroup = browserGroup;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "AccessLogs{" +
                "id=" + id +
                ", systemInfo='" + systemInfo + '\'' +
                ", systemGroup='" + systemGroup + '\'' +
                ", systemType='" + systemType + '\'' +
                ", browserVersion='" + browserVersion + '\'' +
                ", browserName='" + browserName + '\'' +
                ", browserGroup='" + browserGroup + '\'' +
                ", ip='" + ip + '\'' +
                ", date=" + date +
                '}';
    }
}
