package com.perfree.controller.auth.system.vo;


import com.perfree.controller.auth.menu.vo.MenuBaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;
import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@Schema(description = "菜单 Response VO")
@Data
public class MenuTreeListRespVO extends MenuBaseVO {

    @Schema(description = "主键")
    private String id;

    @Schema(description = "父级ID")
    private String pid;

    @Schema(description = "子菜单")
    private List<MenuTreeListRespVO> children;

    @Schema(description = "插件是否为开发环境")
    private Boolean pluginIsDev;

    @Schema(description = "插件前端开发环境地址")
    private String pluginFrontDevAddress;

    @Schema(description = "是否是当前url")
    private Boolean active;


    public Boolean getActive() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String requestURI = request.getRequestURI();
        return getUrl().equals(requestURI);
    }
}
