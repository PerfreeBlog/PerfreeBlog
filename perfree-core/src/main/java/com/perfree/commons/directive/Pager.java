package com.perfree.commons.directive;

/**
 * 自定义模板指令，分页实体
 * @author Perfree
 */
public class Pager {
    private String text;
    private String url;
    private String style;
    private int isActive;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public int getIsActive() {
        return isActive;
    }

    public void setIsActive(int isActive) {
        this.isActive = isActive;
    }
}
