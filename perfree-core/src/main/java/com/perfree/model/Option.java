package com.perfree.model;

import java.io.Serializable;

/**
 * option table
 * @author Perfree
 */
public class Option implements Serializable {
    private static final long serialVersionUID = 7817277417501762377L;
    private Long id;
    private String key;
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
