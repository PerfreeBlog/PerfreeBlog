package com.perfree.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * menu table
 *
 * @author Perfree
 */
@Schema(description = "菜单数据")
public class Menu implements Serializable {
    private static final long serialVersionUID = 7817277417501762477L;
    public static int TYPE_FRONT = 0;
    public static int TYPE_AFTER = 1;

    @Schema(description = "菜单ID", name = "id")
    private String id;

    @Schema(description = "父级菜单ID", name = "pid")
    private String pid;

    @Schema(description = "菜单名", name = "name")
    @NotBlank(message = "菜单名不允许为空")
    @Length(max = 30, message = "菜单名最多30个字符")
    private String name;

    @Schema(description = "菜单url", name = "url")
    @NotBlank(message = "菜单链接不允许为空")
    @Length(max = 50, message = "菜单链接最多50个字符")
    private String url;

    @Schema(description = "菜单图标", name = "icon")
    private String icon;

    @Schema(description = "菜单序号", name = "seq")
    private Integer seq;

    @Schema(description = "菜单类型", name = "type", example = "0:前台,1:后台")
    private Integer type;

    @Schema(description = "菜单状态", name = "status", example = "0:启用,1禁用")
    @NotNull(message = "菜单状态不允许为空")
    private Integer status;

    @Schema(description = "创建时间", name = "createTime")
    private Date createTime;

    @Schema(description = "更新时间", name = "updateTime")
    private Date updateTime;

    @Schema(description = "菜单打开方式", name = "target", example = "0本页,1:新窗口")
    @NotNull(message = "打开方式不允许为空")
    private Integer target;

    @Schema(description = "子菜单", name = "childMenu")
    private List<Menu> childMenu;


    public List<Menu> getChildMenu() {
        return childMenu;
    }

    public void setChildMenu(List<Menu> childMenu) {
        this.childMenu = childMenu;
    }

    public Integer getTarget() {
        return target;
    }

    public void setTarget(Integer target) {
        this.target = target;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }
}
