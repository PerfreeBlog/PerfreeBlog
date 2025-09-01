package com.perfree.commons.directive;

import cn.hutool.core.util.StrUtil;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.UrlUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Schema(description = "分页结果")
@Data
public final class DirectivePageResult<T> implements Serializable {

    @Schema(description = "数据", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<T> data;

    @Schema(description = "总量", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long total;

    @Schema(description = "每页数量", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer pageSize;

    @Schema(description = "当前页码", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer pageNo;

    @Schema(description = "总页码", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer pageTotal;

    @Schema(description = "是否有下一页", requiredMode = Schema.RequiredMode.REQUIRED)
    private Boolean hasNext;

    @Schema(description = "是否有上一页", requiredMode = Schema.RequiredMode.REQUIRED)
    private Boolean hasPrevious;

    @Schema(description = "下一页url", requiredMode = Schema.RequiredMode.REQUIRED)
    private String nextUrl;

    @Schema(description = "上一页url", requiredMode = Schema.RequiredMode.REQUIRED)
    private String previousUrl;

    public DirectivePageResult() {
    }

    public DirectivePageResult(List<T> data, Long total, Integer pageNo, Integer pageSize) {
        this.data = data;
        this.total = total;
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.pageTotal = Math.toIntExact((total - 1) / pageSize + 1);
        this.hasPrevious = pageNo > 1;
        this.hasNext = pageNo < this.pageTotal;
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String requestURI = request.getRequestURI();

        // 如果url里包含了页码,那么先去除
        requestURI = StrUtil.replaceLast(requestURI, this.pageNo.toString(), "", false);

        if (requestURI.equals(SystemConstants.URL_SEPARATOR)) {
            // 如果是首页,则直接跳转至/articleList/
            this.previousUrl =  this.hasPrevious ? SystemConstants.ARTICLE_LIST_URL + (this.pageNo - 1) : "";
            this.nextUrl = this.hasNext ? SystemConstants.ARTICLE_LIST_URL + (this.pageNo + 1) : "";
        } else {
            // 如果非首页,则使用当前url+页码
            if (requestURI.endsWith(SystemConstants.URL_SEPARATOR)) {
                requestURI = StrUtil.replaceLast(requestURI, SystemConstants.URL_SEPARATOR, "", false);
            }
            requestURI += SystemConstants.URL_SEPARATOR;
            this.previousUrl =  this.hasPrevious ? requestURI + (this.pageNo - 1) : "";
            this.nextUrl = this.hasNext ? requestURI + (this.pageNo + 1) : "";
        }

        if (StringUtils.isNotBlank(this.nextUrl)) {
            this.nextUrl = UrlUtil.buildUrl(this.nextUrl);
        }

        if (StringUtils.isNotBlank(this.previousUrl)) {
            this.previousUrl = UrlUtil.buildUrl(this.previousUrl);
        }
    }
}
