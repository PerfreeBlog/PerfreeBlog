package com.perfree.permission;

import java.util.ArrayList;
import java.util.List;

/**
 * @description 菜单组
 * @author Perfree
 * @date 2021/11/11 8:38
 */
public class AdminMenuGroup {
    private String name;
    private String groupId;
    private String icon;
    private String url;
    private List<String> role;
    private int seq;

    private List<MenuItem> menuItems = new ArrayList<>();

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }

    public List<String> getRole() {
        return role;
    }

    public void setRole(List<String> role) {
        this.role = role;
    }


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

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    @Override
    public String toString() {
        return "AdminMenuGroup{" +
                "name='" + name + '\'' +
                ", groupId='" + groupId + '\'' +
                ", icon='" + icon + '\'' +
                ", url='" + url + '\'' +
                ", role=" + role +
                ", seq=" + seq +
                ", menuItems=" + menuItems +
                '}';
    }
}
