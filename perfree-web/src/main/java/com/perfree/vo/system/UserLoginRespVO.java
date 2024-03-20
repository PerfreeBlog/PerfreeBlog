package com.perfree.vo.system;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
@Schema(description = "用户 登录响应 VO")
public class UserLoginRespVO {

    @Schema(description = "用户编号", example = "1024")
    private Long userId;

    @Schema(description = "访问令牌", example = "happy")
    private String accessToken;

    @Schema(description = "刷新令牌", example = "nice")
    private String refreshToken;

    @Schema(description = "过期时间")
    private LocalDateTime expiresTime;
}
