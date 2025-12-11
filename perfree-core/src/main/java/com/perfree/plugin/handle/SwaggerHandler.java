package com.perfree.plugin.handle;

import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.pojo.PluginSpringDoc;
import io.swagger.v3.core.converter.AnnotatedType;
import io.swagger.v3.core.converter.ModelConverters;
import io.swagger.v3.core.converter.ResolvedSchema;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.api.AbstractOpenApiResource;
import org.springdoc.core.models.GroupedOpenApi;
import org.springdoc.core.service.OpenAPIService;
import org.springdoc.core.properties.SpringDocConfigProperties;
import org.springdoc.webmvc.api.MultipleOpenApiResource;
import org.springdoc.webmvc.api.OpenApiResource;
import org.springframework.context.ApplicationContext;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.condition.PathPatternsRequestCondition;
import org.springframework.web.servlet.mvc.condition.RequestMethodsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

/**
 * @author Perfree
 * @description Swagger文档处理
 * @date 2025/12/11
 */
public class SwaggerHandler implements BasePluginRegistryHandler {

    private final ApplicationContext applicationContext;
    private MultipleOpenApiResource multipleOpenApiResource;
    private SpringDocConfigProperties springDocConfigProperties;
    private RequestMappingHandlerMapping requestMappingHandlerMapping;

    public SwaggerHandler(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {
        this.multipleOpenApiResource = applicationContext.getBean(MultipleOpenApiResource.class);
        this.springDocConfigProperties = applicationContext.getBean(SpringDocConfigProperties.class);
        this.requestMappingHandlerMapping = applicationContext.getBean(RequestMappingHandlerMapping.class);
    }

    @Override
    public void registry(PluginInfo pluginInfo) throws Exception {
        PluginSpringDoc springdoc = pluginInfo.getPluginConfig().getSpringdoc();
        if (springdoc == null || !StringUtils.hasText(springdoc.getGroupName())) {
            // 插件没有配置Swagger文档，跳过
            return;
        }

        // 检查分组是否已存在，避免重复添加
        boolean groupExists = springDocConfigProperties.getGroupConfigs().stream()
                .anyMatch(config -> springdoc.getGroupName().equals(config.getGroup()));

        if (groupExists) {
            // 分组已存在，先移除旧配置
            springDocConfigProperties.getGroupConfigs()
                    .removeIf(config -> springdoc.getGroupName().equals(config.getGroup()));
        }

        // 添加分组配置
        SpringDocConfigProperties.GroupConfig groupConfig = new SpringDocConfigProperties.GroupConfig();
        groupConfig.setGroup(springdoc.getGroupName());
        groupConfig.setDisplayName("插件: " + pluginInfo.getPluginConfig().getPlugin().getName());

        // 只使用pathsToMatch，不使用packagesToScan（因为插件类是动态加载的）
        if (StringUtils.hasText(springdoc.getPathsToMatch())) {
            groupConfig.setPathsToMatch(List.of(springdoc.getPathsToMatch()));
        } else {
            // 如果没有配置pathsToMatch，使用默认值
            groupConfig.setPathsToMatch(List.of("/api/**"));
        }

        springDocConfigProperties.getGroupConfigs().add(groupConfig);

        // 手动创建并注册OpenApiResource
        createAndRegisterOpenApiResource(springdoc.getGroupName(), groupConfig);
    }

    @Override
    public void unRegistry(PluginInfo pluginInfo) throws Exception {
        PluginSpringDoc springdoc = pluginInfo.getPluginConfig().getSpringdoc();
        if (springdoc == null || !StringUtils.hasText(springdoc.getGroupName())) {
            return;
        }

        // 移除OpenApiResource
        removeOpenApiResource(springdoc.getGroupName());

        // 移除分组配置
        springDocConfigProperties.getGroupConfigs()
                .removeIf(config -> springdoc.getGroupName().equals(config.getGroup()));
    }

    /**
     * 创建并注册OpenApiResource
     */
    private void createAndRegisterOpenApiResource(String groupName, SpringDocConfigProperties.GroupConfig groupConfig) {
        try {
            // 获取MultipleOpenApiResource中的groupedOpenApis字段
            Field groupedOpenApisField = MultipleOpenApiResource.class.getDeclaredField("groupedOpenApis");
            ReflectionUtils.makeAccessible(groupedOpenApisField);
            @SuppressWarnings("unchecked")
            List<GroupedOpenApi> groupedOpenApis = (List<GroupedOpenApi>) groupedOpenApisField.get(multipleOpenApiResource);

            // 先移除同名的分组
            groupedOpenApis.removeIf(api -> groupName.equals(api.getGroup()));

            // 获取插件的ClassLoader（从已注册的路由中获取）
            ClassLoader pluginClassLoader = null;
            for (var entry : requestMappingHandlerMapping.getHandlerMethods().entrySet()) {
                String path = entry.getKey().toString();
                if (groupConfig.getPathsToMatch() != null &&
                    groupConfig.getPathsToMatch().stream().anyMatch(pattern ->
                        path.contains(pattern.replace("/**", "")))) {
                    pluginClassLoader = entry.getValue().getBeanType().getClassLoader();
                    break;
                }
            }

            if (pluginClassLoader == null) {
                pluginClassLoader = Thread.currentThread().getContextClassLoader();
            }

            final ClassLoader finalPluginClassLoader = pluginClassLoader;

            // 使用GroupedOpenApi.builder()创建新的分组
            GroupedOpenApi.Builder builder = GroupedOpenApi.builder()
                    .group(groupName)
                    .displayName(groupConfig.getDisplayName());

            // 添加路径匹配
            if (groupConfig.getPathsToMatch() != null && !groupConfig.getPathsToMatch().isEmpty()) {
                for (String path : groupConfig.getPathsToMatch()) {
                    builder.pathsToMatch(path);
                }
            }

            // 添加包扫描
            if (groupConfig.getPackagesToScan() != null && !groupConfig.getPackagesToScan().isEmpty()) {
                for (String pkg : groupConfig.getPackagesToScan()) {
                    builder.packagesToScan(pkg);
                }
            }

            GroupedOpenApi groupedOpenApi = builder.build();
            groupedOpenApis.add(groupedOpenApi);

            // 刷新MultipleOpenApiResource
            multipleOpenApiResource.afterPropertiesSet();

            // 使用插件ClassLoader构建文档
            buildOpenApiDoc(groupName, finalPluginClassLoader, groupConfig);
        } catch (Exception e) {
            System.err.println("创建GroupedOpenApi失败: " + groupName);
            e.printStackTrace();
        }
    }

    /**
     * 移除OpenApiResource
     */
    private void removeOpenApiResource(String groupName) {
        try {
            Field groupedOpenApisField = MultipleOpenApiResource.class.getDeclaredField("groupedOpenApis");
            ReflectionUtils.makeAccessible(groupedOpenApisField);
            @SuppressWarnings("unchecked")
            List<GroupedOpenApi> groupedOpenApis = (List<GroupedOpenApi>) groupedOpenApisField.get(multipleOpenApiResource);

            groupedOpenApis.removeIf(api -> groupName.equals(api.getGroup()));

            // 刷新MultipleOpenApiResource
            multipleOpenApiResource.afterPropertiesSet();
        } catch (Exception e) {
            System.err.println("移除GroupedOpenApi失败: " + groupName);
            e.printStackTrace();
        }
    }

    /**
     * 构建OpenAPI文档
     *
     * @param groupName 分组名称
     * @param pluginClassLoader 插件ClassLoader
     * @param groupConfig 分组配置
     */
    private void buildOpenApiDoc(String groupName, ClassLoader pluginClassLoader, SpringDocConfigProperties.GroupConfig groupConfig) {
        ClassLoader originalClassLoader = Thread.currentThread().getContextClassLoader();
        try {
            Thread.currentThread().setContextClassLoader(pluginClassLoader);
            Thread.sleep(100);

            // 反射获取OpenApiResource
            Method getOpenApiResource = MultipleOpenApiResource.class.getDeclaredMethod("getOpenApiResourceOrThrow", String.class);
            ReflectionUtils.makeAccessible(getOpenApiResource);
            OpenApiResource openApiResource = (OpenApiResource) getOpenApiResource.invoke(multipleOpenApiResource, groupName);

            // 反射获取OpenAPIService
            Field openAPIServiceField = AbstractOpenApiResource.class.getDeclaredField("openAPIService");
            ReflectionUtils.makeAccessible(openAPIServiceField);
            OpenAPIService openAPIService = (OpenAPIService) openAPIServiceField.get(openApiResource);

            // 清除缓存并重新构建OpenAPI文档
            openAPIService.setCachedOpenAPI(null, Locale.getDefault());
            OpenAPI openAPI = openAPIService.build(Locale.getDefault());

            // 添加全局Token认证配置
            addSecurityScheme(openAPI);

            // 手动添加插件的路径信息
            Map<RequestMappingInfo, HandlerMethod> matchedHandlers = new LinkedHashMap<>();
            requestMappingHandlerMapping.getHandlerMethods().forEach((info, method) -> {
                // 获取路径模式
                PathPatternsRequestCondition patternsCondition = info.getPathPatternsCondition();
                if (patternsCondition != null && !patternsCondition.getPatterns().isEmpty()) {
                    String path = patternsCondition.getPatterns().iterator().next().getPatternString();

                    // 使用配置的路径模式进行匹配
                    if (groupConfig.getPathsToMatch() != null) {
                        for (String pathPattern : groupConfig.getPathsToMatch()) {
                            // 将通配符模式转换为正则表达式进行匹配
                            String regex = pathPattern.replace("/**", "(/.*)?").replace("/*", "/[^/]*");
                            if (path.matches(regex) || path.startsWith(pathPattern.replace("/**", "/"))) {
                                matchedHandlers.put(info, method);
                                break;
                            }
                        }
                    }
                }
            });

            if (!matchedHandlers.isEmpty()) {
                if (openAPI.getPaths() == null) {
                    openAPI.setPaths(new io.swagger.v3.oas.models.Paths());
                }

                for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : matchedHandlers.entrySet()) {
                    addPathItem(openAPI, entry.getKey(), entry.getValue(), pluginClassLoader);
                }
            }

            // 设置缓存
            openAPIService.setCachedOpenAPI(openAPI, Locale.getDefault());
        } catch (Exception e) {
            System.err.println("插件Swagger文档构建失败: " + groupName);
            e.printStackTrace();
        } finally {
            Thread.currentThread().setContextClassLoader(originalClassLoader);
        }
    }

    /**
     * 添加全局Token认证配置
     */
    private void addSecurityScheme(OpenAPI openAPI) {
        if (openAPI.getComponents() == null) {
            openAPI.setComponents(new io.swagger.v3.oas.models.Components());
        }

        // 添加Token SecurityScheme (使用HTTP Bearer方式，会自动添加Bearer前缀)
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("请输入Token值（系统会自动添加Bearer前缀）");

        openAPI.getComponents().addSecuritySchemes("Authorization", securityScheme);
    }

    /**
     * 添加路径项到OpenAPI
     */
    private void addPathItem(OpenAPI openAPI, RequestMappingInfo mappingInfo, HandlerMethod handlerMethod, ClassLoader classLoader) {
        try {
            ClassLoader original = Thread.currentThread().getContextClassLoader();
            Thread.currentThread().setContextClassLoader(classLoader);

            try {
                // 获取路径
                PathPatternsRequestCondition patternsCondition = mappingInfo.getPathPatternsCondition();
                if (patternsCondition == null || patternsCondition.getPatterns().isEmpty()) {
                    return;
                }

                String path = patternsCondition.getPatterns().iterator().next().getPatternString();

                // 获取HTTP方法
                RequestMethodsRequestCondition methodsCondition = mappingInfo.getMethodsCondition();
                Set<org.springframework.web.bind.annotation.RequestMethod> methods = methodsCondition.getMethods();

                if (methods.isEmpty()) {
                    methods = Set.of(org.springframework.web.bind.annotation.RequestMethod.GET);
                }

                // 获取或创建PathItem
                PathItem pathItem = openAPI.getPaths().get(path);
                if (pathItem == null) {
                    pathItem = new PathItem();
                    openAPI.getPaths().addPathItem(path, pathItem);
                }

                // 确保有 Components
                if (openAPI.getComponents() == null) {
                    openAPI.setComponents(new io.swagger.v3.oas.models.Components());
                }

                // 为每个HTTP方法创建Operation
                for (org.springframework.web.bind.annotation.RequestMethod requestMethod : methods) {
                    io.swagger.v3.oas.models.Operation operation = createOperation(handlerMethod, openAPI.getComponents());

                    switch (requestMethod) {
                        case GET -> pathItem.setGet(operation);
                        case POST -> pathItem.setPost(operation);
                        case PUT -> pathItem.setPut(operation);
                        case DELETE -> pathItem.setDelete(operation);
                        case PATCH -> pathItem.setPatch(operation);
                    }
                }
            } finally {
                Thread.currentThread().setContextClassLoader(original);
            }
        } catch (Exception e) {
            System.err.println("添加路径失败: " + e.getMessage());
        }
    }

    /**
     * 创建Operation对象
     */
    private io.swagger.v3.oas.models.Operation createOperation(HandlerMethod handlerMethod, io.swagger.v3.oas.models.Components components) {
        io.swagger.v3.oas.models.Operation operation = new io.swagger.v3.oas.models.Operation();

        // 解析基本信息（summary, description, tags等）
        parseBasicOperation(operation, handlerMethod);

        // 解析方法参数（@RequestParam, @PathVariable, @RequestBody等）
        parseMethodParameters(operation, handlerMethod, components);

        // 解析响应
        parseResponse(operation, handlerMethod, components);

        // 添加Token认证要求
        SecurityRequirement securityRequirement = new SecurityRequirement();
        securityRequirement.addList("Authorization");
        operation.addSecurityItem(securityRequirement);

        return operation;
    }

    /**
     * 解析基本的 Operation 信息（降级方案）
     */
    private void parseBasicOperation(io.swagger.v3.oas.models.Operation operation, HandlerMethod handlerMethod) {
        Method method = handlerMethod.getMethod();
        Operation operationAnnotation = method.getAnnotation(Operation.class);
        if (operationAnnotation != null) {
            if (StringUtils.hasText(operationAnnotation.summary())) {
                operation.setSummary(operationAnnotation.summary());
            }
            if (StringUtils.hasText(operationAnnotation.description())) {
                operation.setDescription(operationAnnotation.description());
            }
            if (StringUtils.hasText(operationAnnotation.operationId())) {
                operation.setOperationId(operationAnnotation.operationId());
            }
        }
        if (!StringUtils.hasText(operation.getSummary())) {
            operation.setSummary(method.getName());
        }

        // 读取Controller的@Tag注解
        Tag tagAnnotation = handlerMethod.getBeanType().getAnnotation(Tag.class);
        if (tagAnnotation != null && StringUtils.hasText(tagAnnotation.name())) {
            operation.setTags(List.of(tagAnnotation.name()));
        }
    }

    /**
     * 解析方法参数（使用 Swagger ModelConverters）
     */
    private void parseMethodParameters(io.swagger.v3.oas.models.Operation operation, HandlerMethod handlerMethod, io.swagger.v3.oas.models.Components components) {
        Method method = handlerMethod.getMethod();
        java.lang.reflect.Parameter[] parameters = method.getParameters();

        for (java.lang.reflect.Parameter param : parameters) {
            // @RequestBody 注解 - 请求体
            if (param.isAnnotationPresent(org.springframework.web.bind.annotation.RequestBody.class)) {
                org.springframework.web.bind.annotation.RequestBody reqBody =
                    param.getAnnotation(org.springframework.web.bind.annotation.RequestBody.class);

                io.swagger.v3.oas.models.parameters.RequestBody requestBody =
                    new io.swagger.v3.oas.models.parameters.RequestBody();
                requestBody.setRequired(reqBody.required());
                requestBody.setDescription("请求体");

                Content content = new Content();
                MediaType mediaType = new MediaType();

                // 使用 Swagger ModelConverters 解析类型（支持所有 Swagger 注解）
                try {
                    ResolvedSchema resolvedSchema = ModelConverters.getInstance()
                        .resolveAsResolvedSchema(new AnnotatedType(param.getType()).resolveAsRef(true));

                    if (resolvedSchema != null && resolvedSchema.schema != null) {
                        // 将解析出的所有 schema 添加到 components
                        if (resolvedSchema.referencedSchemas != null && !resolvedSchema.referencedSchemas.isEmpty()) {
                            if (components.getSchemas() == null) {
                                components.setSchemas(new java.util.HashMap<>());
                            }
                            resolvedSchema.referencedSchemas.forEach(components.getSchemas()::put);
                        }

                        // 使用主 schema（可能是引用）
                        mediaType.setSchema(resolvedSchema.schema);
                    } else {
                        // 降级方案
                        mediaType.setSchema(new Schema<>().type("object"));
                    }
                } catch (Exception e) {
                    // 降级方案
                    mediaType.setSchema(new Schema<>().type("object"));
                }

                content.addMediaType("application/json", mediaType);
                requestBody.setContent(content);
                operation.setRequestBody(requestBody);
                continue;
            }

            // @RequestParam 注解 - 查询参数
            if (param.isAnnotationPresent(org.springframework.web.bind.annotation.RequestParam.class)) {
                org.springframework.web.bind.annotation.RequestParam reqParam =
                    param.getAnnotation(org.springframework.web.bind.annotation.RequestParam.class);

                io.swagger.v3.oas.models.parameters.Parameter parameter =
                    new io.swagger.v3.oas.models.parameters.Parameter();
                parameter.setIn("query");
                parameter.setName(StringUtils.hasText(reqParam.value()) ? reqParam.value() :
                    (StringUtils.hasText(reqParam.name()) ? reqParam.name() : param.getName()));
                parameter.setRequired(reqParam.required());
                parameter.setSchema(createSimpleSchema(param.getType()));

                // 读取 @Parameter 注解的描述
                if (param.isAnnotationPresent(io.swagger.v3.oas.annotations.Parameter.class)) {
                    io.swagger.v3.oas.annotations.Parameter paramAnno =
                        param.getAnnotation(io.swagger.v3.oas.annotations.Parameter.class);
                    if (StringUtils.hasText(paramAnno.description())) {
                        parameter.setDescription(paramAnno.description());
                    }
                }

                operation.addParametersItem(parameter);
                continue;
            }

            // @PathVariable 注解 - 路径参数
            if (param.isAnnotationPresent(org.springframework.web.bind.annotation.PathVariable.class)) {
                org.springframework.web.bind.annotation.PathVariable pathVar =
                    param.getAnnotation(org.springframework.web.bind.annotation.PathVariable.class);

                io.swagger.v3.oas.models.parameters.Parameter parameter =
                    new io.swagger.v3.oas.models.parameters.Parameter();
                parameter.setIn("path");
                parameter.setName(StringUtils.hasText(pathVar.value()) ? pathVar.value() :
                    (StringUtils.hasText(pathVar.name()) ? pathVar.name() : param.getName()));
                parameter.setRequired(true);
                parameter.setSchema(createSimpleSchema(param.getType()));

                // 读取 @Parameter 注解的描述
                if (param.isAnnotationPresent(io.swagger.v3.oas.annotations.Parameter.class)) {
                    io.swagger.v3.oas.annotations.Parameter paramAnno =
                        param.getAnnotation(io.swagger.v3.oas.annotations.Parameter.class);
                    if (StringUtils.hasText(paramAnno.description())) {
                        parameter.setDescription(paramAnno.description());
                    }
                }

                operation.addParametersItem(parameter);
            }
        }
    }

    /**
     * 解析响应（使用 Swagger ModelConverters）
     */
    private void parseResponse(io.swagger.v3.oas.models.Operation operation, HandlerMethod handlerMethod, io.swagger.v3.oas.models.Components components) {
        ApiResponses responses = new ApiResponses();
        ApiResponse response200 = new ApiResponse();
        response200.setDescription("成功");

        // 获取返回类型
        Class<?> returnType = handlerMethod.getReturnType().getParameterType();

        Content content = new Content();
        MediaType mediaType = new MediaType();

        // 使用 Swagger ModelConverters 解析返回类型
        try {
            ResolvedSchema resolvedSchema = ModelConverters.getInstance()
                .resolveAsResolvedSchema(new AnnotatedType(returnType).resolveAsRef(true));

            if (resolvedSchema != null && resolvedSchema.schema != null) {
                // 将解析出的所有 schema 添加到 components
                if (resolvedSchema.referencedSchemas != null && !resolvedSchema.referencedSchemas.isEmpty()) {
                    if (components.getSchemas() == null) {
                        components.setSchemas(new java.util.HashMap<>());
                    }
                    resolvedSchema.referencedSchemas.forEach(components.getSchemas()::put);
                }

                // 使用主 schema
                mediaType.setSchema(resolvedSchema.schema);
            } else {
                // 降级方案
                mediaType.setSchema(new Schema<>().type("object"));
            }
        } catch (Exception e) {
            // 降级方案
            mediaType.setSchema(new Schema<>().type("object"));
        }

        content.addMediaType("application/json", mediaType);
        response200.setContent(content);

        responses.addApiResponse("200", response200);
        operation.setResponses(responses);
    }

    /**
     * 为简单类型创建 Schema
     */
    private Schema<?> createSimpleSchema(Class<?> type) {
        Schema<?> schema = new Schema<>();

        if (type == String.class) {
            schema.setType("string");
        } else if (type == Integer.class || type == int.class) {
            schema.setType("integer");
            schema.setFormat("int32");
        } else if (type == Long.class || type == long.class) {
            schema.setType("integer");
            schema.setFormat("int64");
        } else if (type == Boolean.class || type == boolean.class) {
            schema.setType("boolean");
        } else if (type == Double.class || type == double.class || type == Float.class || type == float.class) {
            schema.setType("number");
        } else if (type.isArray()) {
            schema.setType("array");
            schema.setItems(createSimpleSchema(type.getComponentType()));
        } else {
            schema.setType("object");
        }

        return schema;
    }

}
