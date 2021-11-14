package com.perfree.directive;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 自定义模板指令，分页实体
 * @param <T> 类型
 */
public class DirectivePage<T> {
    /** 页码 */
    private Integer pageIndex;

    /** 每页数据量 */
    private Integer pageSize;

    /** 总条数 */
    private Long total;

    /** 数据集 */
    private Object data;

    /** url前缀 */
    private String urlPrefix;

    private String queryParam;
    private String queryParamName;

    private List<Pager> pagers;

    private T form;

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getUrlPrefix() {
        return urlPrefix;
    }

    public void setUrlPrefix(String urlPrefix) {
        this.urlPrefix = urlPrefix;
    }

    public List<Pager> getPagers() {
        return pagers;
    }

    public void setPagers(List<Pager> pagers) {
        this.pagers = pagers;
    }

    public void initPagers() {
        if (total == 0){
            return;
        }
        long pageSum = (total - 1) / pageSize + 1;
        pagers = new ArrayList<>();
        for (int i = 1; i <= pageSum; i++) {
            Pager pager = new Pager();
            if (i == pageIndex) {
                pager.setIsActive(1);
                pager.setStyle("active");
            } else {
                pager.setIsActive(0);
                pager.setStyle("");
            }
            pager.setText(String.valueOf(i));
            pager.setUrl(urlPrefix + i);
            if (pageIndex == i) {
                pager.setUrl("");
                pager.setStyle(pager.getStyle() + " disabled");
            } else {
                if (StringUtils.isNotBlank(queryParamName)) {
                    pager.setUrl(pager.getUrl() + "?" + queryParamName + "=" + queryParam);
                }
            }
            pagers.add(pager);
        }
    }

    public String getPreUrl() {
        if ((pageIndex - 1) <= 0) {
            return "";
        }
        if (StringUtils.isNotBlank(queryParamName)) {
            return urlPrefix + (pageIndex - 1) + "?" + queryParamName + "=" + queryParam;
        }
        return urlPrefix + (pageIndex - 1);
    }

    public String getNextUrl() {
        long pageSum = (total - 1) / pageSize + 1;
        if ((pageIndex + 1) > pageSum) {
            return "";
        }
        if (StringUtils.isNotBlank(queryParamName)) {
            return urlPrefix + (pageIndex + 1) + "?" + queryParamName + "=" + queryParam;
        }
        return urlPrefix + (pageIndex + 1);
    }

    public String getPreUrlStyle() {
        if ((pageIndex - 1) <= 0) {
            return "disabled";
        }
        return "";
    }

    public String getNextUrlStyle() {
        long pageSum = (total - 1) / pageSize + 1;
        if ((pageIndex + 1) > pageSum) {
            return "disabled";
        }
        return "";
    }

    public T getForm() {
        return form;
    }

    public void setForm(T form) {
        this.form = form;
    }

    public String getQueryParam() {
        return queryParam;
    }

    public void setQueryParam(String queryParam) {
        this.queryParam = queryParam;
    }


    public String getQueryParamName() {
        return queryParamName;
    }

    public void setQueryParamName(String queryParamName) {
        this.queryParamName = queryParamName;
    }
}
