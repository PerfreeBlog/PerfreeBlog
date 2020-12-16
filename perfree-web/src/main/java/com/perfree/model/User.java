package com.perfree.model;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.util.Date;

/**
 * User Table
 */
public class User implements Serializable {
    private static final long serialVersionUID = -4338379690203608321L;
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
    private Integer status;
    private String avatar;
    private Long roleId;
    private Date createTime;
    private Date updateTime;

    private Role role;
    @Email(message = "请正确填写邮箱")
    private String email;
    private Integer sex = -1;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

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

    public boolean hasAdmin() {
        if (role == null) {
            return false;
        }
        return role.getCode().equals("admin") || role.getCode().equals("superAdmin");
    }
}
