package com.perfree.model;

import com.perfree.commons.GravatarUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * User Table
 *
 * @author Perfree
 */
@Schema(description = "用户数据")
public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Schema(description = "id", name = "id")
    private Long id;

    @Schema(description = "账户", name = "account")
    @NotBlank(message = "账户不允许为空")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "账户只能填写字母或数字")
    @Length(min = 3, max = 12, message = "账户长度要在3-12字符之间")
    private String account;

    @Schema(description = "用户名", name = "userName")
    @NotBlank(message = "用户名不允许为空")
    @Length(min = 2, max = 16, message = "用户名长度要在2-16字符之间")
    private String userName;

    @Schema(description = "密码", name = "password")
    private String password;

    @Schema(description = "盐值", name = "salt")
    private String salt;

    @Schema(description = "状态", name = "status", example = "0正常,1禁用")
    private Integer status;

    @Schema(description = "头像", name = "avatar")
    private String avatar;

    @Schema(description = "角色id", name = "roleId")
    private Long roleId;

    @Schema(description = "创建时间", name = "createTime")
    private Date createTime;

    @Schema(description = "更新时间", name = "updateTime")
    private Date updateTime;

    @Schema(hidden = true)
    private String captcha;

    @Schema(description = "网址", name = "website")
    private String website;

    @Schema(hidden = true)
    private Boolean readAvatar = true;

    @Schema(description = "角色信息", name = "role")
    private Role role;

    @Schema(description = "邮箱", name = "email")
    @NotBlank(message = "邮箱不允许为空")
    @Email(message = "请正确填写邮箱")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Boolean getReadAvatar() {
        return readAvatar;
    }

    public void setReadAvatar(Boolean readAvatar) {
        this.readAvatar = readAvatar;
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
        if (readAvatar) {
            return GravatarUtil.replaceGravatar(avatar);
        }
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
        return role.getCode().equals("admin") || role.getCode().equals("editor") ||
                role.getCode().equals("contribute") || role.getCode().equals("user");
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}
