package com.perfree.commons;

/**
 * 自定义view异常,用于vue/angular等类型主题跳转
 */
public class FrontViewNodeRenderException extends Exception {
    private FrontViewNodeRender frontViewNodeRender;

    public FrontViewNodeRenderException(FrontViewNodeRender frontViewNodeRender) {
        this.frontViewNodeRender = frontViewNodeRender;
    }

    public FrontViewNodeRender getFrontViewNodeRender() {
        return frontViewNodeRender;
    }

    public void setFrontViewNodeRender(FrontViewNodeRender frontViewNodeRender) {
        this.frontViewNodeRender = frontViewNodeRender;
    }
}
