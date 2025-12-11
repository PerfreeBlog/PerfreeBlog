package com.demo.service;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * @author Perfree
 * @description 异步服务示例 - 展示如何在插件中实现异步功能
 * 注意：由于插件使用独立 ClassLoader，无法直接使用 @Async 注解
 * 本示例演示使用 CompletableFuture 和 Executor 实现异步功能
 * @date 2025-12-11
 */
@Slf4j
@Service
public class AsyncExampleService {

    /**
     * 从主应用注入线程池执行器
     * 如果注入失败，会在 @PostConstruct 中创建默认的执行器
     */
    @Autowired(required = false)
    private Executor taskExecutor;

    @PostConstruct
    public void init() {
        if (taskExecutor == null) {
            log.warn("未找到 applicationTaskExecutor，使用默认线程池");
            taskExecutor = Executors.newFixedThreadPool(10);
        }
    }

    /**
     * 异步发送邮件示例
     * 使用 CompletableFuture 在独立线程中执行，不会阻塞调用者
     *
     * @param to      收件人
     * @param subject 主题
     * @param content 内容
     */
    public void sendEmailAsync(String to, String subject, String content) {
        CompletableFuture.runAsync(() -> {
            log.info("【异步任务】开始发送邮件 - 收件人: {}, 主题: {}", to, subject);
            try {
                // 模拟发送邮件耗时操作
                Thread.sleep(3000);
                log.info("【异步任务】邮件发送成功 - 收件人: {}", to);
            } catch (InterruptedException e) {
                log.error("【异步任务】邮件发送失败", e);
                Thread.currentThread().interrupt();
            }
        }, taskExecutor);
    }

    /**
     * 异步处理数据示例（带返回值）
     * 使用 CompletableFuture 可以获取异步方法的返回结果
     *
     * @param data 要处理的数据
     * @return CompletableFuture<String> 处理结果
     */
    public CompletableFuture<String> processDataAsync(String data) {
        return CompletableFuture.supplyAsync(() -> {
            log.info("【异步任务】开始处理数据: {}", data);
            try {
                // 模拟数据处理耗时操作
                Thread.sleep(2000);
                String result = "处理完成: " + data.toUpperCase();
                log.info("【异步任务】数据处理完成: {}", result);
                return result;
            } catch (InterruptedException e) {
                log.error("【异步任务】数据处理失败", e);
                Thread.currentThread().interrupt();
                throw new RuntimeException("数据处理失败", e);
            }
        }, taskExecutor);
    }

    /**
     * 异步生成报表示例
     * 适用于耗时较长的报表生成场景
     *
     * @param reportType 报表类型
     * @param params     报表参数
     */
    public void generateReportAsync(String reportType, String params) {
        CompletableFuture.runAsync(() -> {
            log.info("【异步任务】开始生成报表 - 类型: {}, 参数: {}", reportType, params);
            try {
                // 模拟报表生成
                Thread.sleep(5000);
                log.info("【异步任务】报表生成完成 - 类型: {}", reportType);
                // 在实际应用中，这里可以：
                // 1. 将报表保存到文件系统
                // 2. 发送通知给用户
                // 3. 更新数据库状态
            } catch (InterruptedException e) {
                log.error("【异步任务】报表生成失败", e);
                Thread.currentThread().interrupt();
            }
        }, taskExecutor);
    }

    /**
     * 批量异步处理示例
     * 展示如何并发处理多个任务
     *
     * @param items 要处理的项目列表
     */
    public void batchProcessAsync(String[] items) {
        CompletableFuture.runAsync(() -> {
            log.info("【异步任务】开始批量处理，共 {} 项", items.length);
            long startTime = System.currentTimeMillis();

            for (String item : items) {
                try {
                    // 模拟处理单个项目
                    Thread.sleep(500);
                    log.debug("【异步任务】处理项目: {}", item);
                } catch (InterruptedException e) {
                    log.error("【异步任务】处理项目失败: {}", item, e);
                    Thread.currentThread().interrupt();
                    break;
                }
            }

            long duration = System.currentTimeMillis() - startTime;
            log.info("【异步任务】批量处理完成，耗时: {} ms", duration);
        }, taskExecutor);
    }

    /**
     * 异步文件上传示例
     *
     * @param fileName 文件名
     * @param fileSize 文件大小（字节）
     */
    public void uploadFileAsync(String fileName, long fileSize) {
        CompletableFuture.runAsync(() -> {
            log.info("【异步任务】开始上传文件: {}, 大小: {} bytes", fileName, fileSize);
            try {
                // 模拟文件上传过程
                int progress = 0;
                while (progress < 100) {
                    Thread.sleep(100);
                    progress += 10;
                    log.debug("【异步任务】上传进度: {}%", progress);
                }
                log.info("【异步任务】文件上传完成: {}", fileName);
            } catch (InterruptedException e) {
                log.error("【异步任务】文件上传失败: {}", fileName, e);
                Thread.currentThread().interrupt();
            }
        }, taskExecutor);
    }
}
