package com.perfree.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * option table
 * @author Perfree
 */
@ApiModel(value="Option-配置项数据",description="配置项数据")
public class Option implements Serializable {
    private static final long serialVersionUID = 7817277417501762377L;

    @ApiModelProperty(value="配置项ID",name="id")
    private Long id;

    @ApiModelProperty(value="配置key",name="key")
    private String key;

    @ApiModelProperty(value="配置value",name="value")
    private String value;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
