package com.perfree.permission;

import java.util.List;

public class MenuItem {
    private String name;
    private String groupId;
    private String icon;
    private String url;
    private List<String> role;
    private int seq;
    private int target;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<String> getRole() {
        return role;
    }

    public void setRole(List<String> role) {
        this.role = role;
    }

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    @Override
    public String toString() {
        return "MenuItem{" +
                "name='" + name + '\'' +
                ", groupId='" + groupId + '\'' +
                ", icon='" + icon + '\'' +
                ", url='" + url + '\'' +
                ", role=" + role +
                ", seq=" + seq +
                ", target=" + target +
                '}';
    }
}
