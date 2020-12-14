package com.perfree.directive;

import java.util.ArrayList;
import java.util.List;

public class DirectivePage<T> {
    //  页码
    private Integer pageIndex;
    // 每页数据量
    private Integer pageSize;
    // 总条数
    private Long total;
    // 数据集
    private Object data;

    private String urlPrefix;

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
            pagers.add(pager);
        }
    }

    public String getPreUrl() {
        if ((pageIndex - 1) <= 0) {
            return "javascript:;";
        }
        return urlPrefix + (pageIndex - 1);
    }

    public String getNextUrl() {
        long pageSum = (total - 1) / pageSize + 1;
        if ((pageIndex + 1) > pageSum) {
            return "javascript:;";
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
}
