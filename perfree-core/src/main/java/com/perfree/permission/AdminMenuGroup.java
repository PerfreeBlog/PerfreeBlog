package com.perfree.permission;

import com.perfree.model.Menu;

import java.util.ArrayList;
import java.util.List;

/**
 * @description 菜单组
 * @author Perfree
 * @date 2021/11/11 8:38
 */
public class AdminMenuGroup extends Menu {
    private String groupId;
    private List<String> role;
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

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

}
