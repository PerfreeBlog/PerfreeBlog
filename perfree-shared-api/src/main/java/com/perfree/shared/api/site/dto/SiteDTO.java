package com.perfree.shared.api.site.dto;

import lombok.Data;

@Data
public class SiteDTO {

    private Long id;

    /**
     * 站点名称
     */
    private String name;

    /**
     * 站点描述
     */
    private String description;

    /**
     * 站点标识
     */
    private String flag;
}
