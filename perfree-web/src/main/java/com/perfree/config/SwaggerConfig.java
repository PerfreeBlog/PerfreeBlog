package com.perfree.config;

import com.github.xiaoymin.swaggerbootstrapui.annotations.EnableSwaggerBootstrapUI;
import org.springframework.boot.SpringBootVersion;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

/**
 * Swagger配置
 */
@Configuration
@EnableSwagger2
@EnableSwaggerBootstrapUI
public class SwaggerConfig {

    private final SwaggerProperties swaggerProperties;

    public SwaggerConfig(SwaggerProperties swaggerProperties) {
        this.swaggerProperties = swaggerProperties;
    }

    /**
     * Token设置
     *
     * @return List<Parameter>
     */
    private List<Parameter> getTokenPar() {
        List<Parameter> pars = new ArrayList<>();
        ParameterBuilder tokenPar = new ParameterBuilder();
        tokenPar.name("Authorization")
                .description("认证信息[登录后返回的token]")
                .modelRef(new ModelRef("string")).parameterType("header").required(false);
        pars.add(tokenPar.build());
        ParameterBuilder headerAccessKeyTokenPar = new ParameterBuilder();
        headerAccessKeyTokenPar.name("AccessKey")
                .description("接口签名[可选择header或query任意一方式传输]")
                .modelRef(new ModelRef("string")).parameterType("header").required(false);
        pars.add(headerAccessKeyTokenPar.build());
        ParameterBuilder accessKeyTokenPar = new ParameterBuilder();
        accessKeyTokenPar.name("access_key").description("接口签名[可选择header或query任意一方式传输]").modelRef(new ModelRef("string")).parameterType("query").required(false);
        pars.add(accessKeyTokenPar.build());
        return pars;
    }

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .enable(swaggerProperties.getEnable())
                .pathMapping("/")
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.perfree.controller.api"))
                .paths(PathSelectors.any())
                .build()
                .globalOperationParameters(getTokenPar());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(swaggerProperties.getApplicationName() + " Api Doc")
                .description(swaggerProperties.getApplicationDescription())
                .version("Application Version: " + swaggerProperties.getApplicationVersion() + ", Spring Boot Version: " + SpringBootVersion.getVersion())
                .build();
    }
}
