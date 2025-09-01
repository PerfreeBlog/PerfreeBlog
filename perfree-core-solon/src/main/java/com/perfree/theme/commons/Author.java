package com.perfree.theme.commons;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Author {
    @Schema(description = "作者名")
    private String name;
    @Schema(description = "邮箱")
    private String email;
    @Schema(description = "个人网站")
    private String webSite;
}
