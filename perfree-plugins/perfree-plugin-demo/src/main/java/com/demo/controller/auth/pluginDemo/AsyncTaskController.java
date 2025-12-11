package com.demo.controller.auth.pluginDemo;

import com.demo.service.AsyncExampleService;
import com.perfree.commons.common.CommonResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * @author Perfree
 * @description 异步任务测试控制器 - 展示如何在插件中使用异步服务
 * @date 2025-12-11
 */
@Slf4j
@RestController
@Tag(name = "插件Demo-异步任务测试")
@RequestMapping("/api/auth/pluginDemo/asyncTask")
public class AsyncTaskController {

    @Resource
    private AsyncExampleService asyncExampleService;

    /**
     * 测试异步发送邮件
     */
    @Operation(summary = "测试异步发送邮件")
    @PostMapping("/sendEmail")
    public CommonResult<String> sendEmail(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String content) {

        log.info("收到发送邮件请求: to={}, subject={}", to, subject);

        // 异步发送邮件，不阻塞当前请求
        asyncExampleService.sendEmailAsync(to, subject, content);

        // 立即返回响应
        return CommonResult.success("邮件已进入发送队列，正在异步发送中...");
    }

    /**
     * 测试异步数据处理（带返回值）
     */
    @Operation(summary = "测试异步数据处理")
    @PostMapping("/processData")
    public CommonResult<Map<String, Object>> processData(@RequestParam String data) {

        log.info("收到数据处理请求: data={}", data);

        // 调用异步方法
        CompletableFuture<String> future = asyncExampleService.processDataAsync(data);

        Map<String, Object> result = new HashMap<>();
        result.put("status", "processing");
        result.put("message", "数据处理已开始，正在异步执行...");

        // 可以选择等待结果（这里为了演示，不等待）
        // 在实际应用中，可以通过回调、消息队列或轮询来获取结果
        future.whenComplete((res, ex) -> {
            if (ex == null) {
                log.info("数据处理完成，结果: {}", res);
            } else {
                log.error("数据处理失败", ex);
            }
        });

        return CommonResult.success(result);
    }

    /**
     * 测试异步报表生成
     */
    @Operation(summary = "测试异步报表生成")
    @PostMapping("/generateReport")
    public CommonResult<String> generateReport(
            @RequestParam String reportType,
            @RequestParam(required = false, defaultValue = "{}") String params) {

        log.info("收到报表生成请求: type={}, params={}", reportType, params);

        asyncExampleService.generateReportAsync(reportType, params);

        return CommonResult.success("报表生成任务已提交，正在后台处理...");
    }

    /**
     * 测试批量异步处理
     */
    @Operation(summary = "测试批量异步处理")
    @PostMapping("/batchProcess")
    public CommonResult<String> batchProcess(@RequestBody String[] items) {

        log.info("收到批量处理请求，项目数量: {}", items.length);

        asyncExampleService.batchProcessAsync(items);

        return CommonResult.success("批量处理任务已提交，共 " + items.length + " 项");
    }

    /**
     * 测试异步文件上传
     */
    @Operation(summary = "测试异步文件上传")
    @PostMapping("/uploadFile")
    public CommonResult<String> uploadFile(
            @RequestParam String fileName,
            @RequestParam long fileSize) {

        log.info("收到文件上传请求: fileName={}, fileSize={}", fileName, fileSize);

        asyncExampleService.uploadFileAsync(fileName, fileSize);

        return CommonResult.success("文件上传任务已提交，正在后台上传...");
    }

    /**
     * 测试多个异步任务并发执行
     */
    @Operation(summary = "测试多个异步任务并发执行")
    @PostMapping("/multipleAsync")
    public CommonResult<Map<String, Object>> multipleAsync() {

        log.info("开始执行多个异步任务...");

        // 同时启动多个异步任务
        asyncExampleService.sendEmailAsync("user1@example.com", "测试主题1", "测试内容1");
        asyncExampleService.sendEmailAsync("user2@example.com", "测试主题2", "测试内容2");
        asyncExampleService.uploadFileAsync("test-file-1.pdf", 1024000);
        asyncExampleService.uploadFileAsync("test-file-2.pdf", 2048000);

        CompletableFuture<String> future1 = asyncExampleService.processDataAsync("数据集1");
        CompletableFuture<String> future2 = asyncExampleService.processDataAsync("数据集2");
        CompletableFuture<String> future3 = asyncExampleService.processDataAsync("数据集3");

        // 等待所有处理完成
        CompletableFuture.allOf(future1, future2, future3).whenComplete((v, ex) -> {
            if (ex == null) {
                log.info("所有异步任务执行完成");
            } else {
                log.error("部分异步任务执行失败", ex);
            }
        });

        Map<String, Object> result = new HashMap<>();
        result.put("emailTasks", 2);
        result.put("uploadTasks", 2);
        result.put("processTasks", 3);
        result.put("totalTasks", 7);
        result.put("message", "已提交 7 个异步任务，正在并发执行...");

        return CommonResult.success(result);
    }

    /**
     * 获取异步任务状态（演示用）
     */
    @Operation(summary = "获取任务执行状态")
    @GetMapping("/status")
    public CommonResult<Map<String, Object>> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("message", "异步任务正在后台执行，请查看日志了解详细执行情况");
        status.put("tip", "在生产环境中，建议使用消息队列、数据库或Redis来跟踪任务状态");

        return CommonResult.success(status);
    }
}
