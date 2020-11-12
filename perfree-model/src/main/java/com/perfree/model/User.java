package com.perfree.model;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;

/**
 * User Table
 */
public class User {
    private Long id;
    @NotBlank(message = "账户不允许为空")
    @Pattern(regexp ="^[A-Za-z0-9]+$",message = "账户只能填写字母或数字")
    @Length(min = 3,max = 12,message = "账户长度要在3-12字符之间")
    private String account;
    @NotBlank(message = "用户名不允许为空")
    @Length(min = 2,max = 16,message = "用户名长度要在2-16字符之间")
    private String userName;
    private String password;
    private String salt;
    @NotNull(message = "状态不允许为空")
    private Integer status;
    private String avatar;
    @NotNull(message = "角色不允许为空")
    private Long roleId;
    private Date createTime;
    private Date updateTime;

    private Role role;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", status=" + status +
                ", avatar='" + avatar + '\'' +
                ", roleId=" + roleId +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", role=" + role +
                '}';
    }
}
