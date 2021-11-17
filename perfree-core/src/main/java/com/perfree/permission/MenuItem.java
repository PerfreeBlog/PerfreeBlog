package com.perfree.permission;

import com.perfree.model.Menu;

import java.util.List;

/**
 * @description 菜单
 * @author Perfree
 * @date 2021/11/11 8:38
 */
public class MenuItem extends Menu {
    private String groupId;
    private List<String> role;

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public List<String> getRole() {
        return role;
    }

    public void setRole(List<String> role) {
        this.role = role;
    }
}
