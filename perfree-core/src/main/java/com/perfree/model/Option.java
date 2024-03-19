package com.perfree.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;

/**
 * option table
 *
 * @author Perfree
 */
@Schema(description = "配置项数据")
public class Option implements Serializable {
    private static final long serialVersionUID = 7817277417501762377L;

    @Schema(description = "配置项ID", name = "id")
    private Long id;

    @Schema(description = "配置key", name = "key")
    private String key;

    @Schema(description = "配置value", name = "value")
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
