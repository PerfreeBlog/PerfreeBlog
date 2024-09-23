package com.perfree.exception;

import com.perfree.commons.annotation.FrontViewNodeRender;
import lombok.Getter;

/**
 * 自定义view异常
 */
@Getter
public class FrontViewNodeRenderException extends Exception {
    private FrontViewNodeRender frontViewNodeRender;

    public FrontViewNodeRenderException(FrontViewNodeRender frontViewNodeRender) {
        this.frontViewNodeRender = frontViewNodeRender;
    }

    public void setFrontViewNodeRender(FrontViewNodeRender frontViewNodeRender) {
        this.frontViewNodeRender = frontViewNodeRender;
    }
}
