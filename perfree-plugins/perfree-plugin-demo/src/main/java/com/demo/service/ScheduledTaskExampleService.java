package com.demo.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author Perfree
 * @description 定时任务示例 - 展示如何在插件中使用 @Scheduled 注解
 * @date 2025-12-11
 */
@Slf4j
@Component
public class ScheduledTaskExampleService {

    private final AtomicInteger executeCount = new AtomicInteger(0);
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 固定间隔执行示例 - 每10秒执行一次
     * fixedRate: 以固定频率执行，不管上次任务是否完成
     */
    @Scheduled(fixedRate = 10000)
    public void executeEvery10Seconds() {
        int count = executeCount.incrementAndGet();
        String time = LocalDateTime.now().format(formatter);
        log.info("========================================");
        log.info("【插件定时任务】固定间隔任务 - 第 {} 次执行", count);
        log.info("【插件定时任务】执行时间: {}", time);
        log.info("========================================");
    }

    /**
     * Cron 表达式示例 - 每分钟的第0秒执行
     * cron: 使用 cron 表达式定义执行时间
     */
    @Scheduled(cron = "0 * * * * ?")
    public void executeEveryMinute() {
        String time = LocalDateTime.now().format(formatter);
        log.info("【插件定时任务-Cron】每分钟执行，时间: {}", time);
    }

    // ============ 以下是其他定时任务示例（已注释，需要时可以取消注释） ============

    /*
     * 固定延迟执行示例 - 上次任务完成后延迟10秒再执行
     * fixedDelay: 上次任务完成后，延迟指定时间再执行
     */
    // @Scheduled(fixedDelay = 10000)
    // public void executeWithFixedDelay() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-固定延迟】开始执行，当前时间: {}", time);
    //     try {
    //         Thread.sleep(2000);
    //     } catch (InterruptedException e) {
    //         Thread.currentThread().interrupt();
    //     }
    //     log.info("【定时任务-固定延迟】执行完成");
    // }

    /*
     * Cron 表达式示例 - 每小时的第0分0秒执行
     */
    // @Scheduled(cron = "0 0 * * * ?")
    // public void executeEveryHour() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-Cron每小时】执行时间: {}", time);
    // }

    /*
     * Cron 表达式示例 - 每天凌晨2点执行
     */
    // @Scheduled(cron = "0 0 2 * * ?")
    // public void executeDaily() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-Cron每天凌晨2点】执行时间: {}", time);
    // }

    /*
     * Cron 表达式示例 - 每周一早上9点执行
     */
    // @Scheduled(cron = "0 0 9 ? * MON")
    // public void executeWeekly() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-Cron每周一9点】执行时间: {}", time);
    // }

    /*
     * Cron 表达式示例 - 每月1号凌晨0点执行
     */
    // @Scheduled(cron = "0 0 0 1 * ?")
    // public void executeMonthly() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-Cron每月1号】执行时间: {}", time);
    // }

    /**
     * 初始延迟执行示例 - 启动后延迟5秒执行第一次，之后每30秒执行一次
     * initialDelay: 首次执行前的延迟时间
     * 这个任务可以用来验证定时任务是否正常工作
     */
    @Scheduled(initialDelay = 5000, fixedRate = 30000)
    public void executeWithInitialDelay() {
        String time = LocalDateTime.now().format(formatter);
        log.info("========================================");
        log.info("【插件定时任务】初始延迟任务执行");
        log.info("【插件定时任务】执行时间: {}", time);
        log.info("【插件定时任务】提示: 如果看到这条日志，说明定时任务功能正常！");
        log.info("========================================");
    }

    /*
     * 工作日执行示例 - 周一到周五每天上午10点执行
     */
    // @Scheduled(cron = "0 0 10 ? * MON-FRI")
    // public void executeOnWorkdays() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-工作日】执行时间: {}", time);
    // }

    /*
     * 多时间点执行示例 - 每天的8点、12点、18点执行
     */
    // @Scheduled(cron = "0 0 8,12,18 * * ?")
    // public void executeAtSpecificTimes() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-多时间点】执行时间: {}", time);
    // }

    /*
     * 数据清理任务示例 - 每天凌晨3点清理过期数据
     */
    // @Scheduled(cron = "0 0 3 * * ?")
    // public void cleanupExpiredData() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-数据清理】开始清理过期数据，时间: {}", time);
    //     try {
    //         Thread.sleep(1000);
    //         int deletedCount = (int) (Math.random() * 100);
    //         log.info("【定时任务-数据清理】清理完成，删除 {} 条过期数据", deletedCount);
    //     } catch (InterruptedException e) {
    //         log.error("【定时任务-数据清理】执行失败", e);
    //         Thread.currentThread().interrupt();
    //     }
    // }

    /*
     * 缓存刷新任务示例 - 每30分钟刷新一次缓存
     */
    // @Scheduled(cron = "0 */30 * * * ?")
    // public void refreshCache() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-缓存刷新】开始刷新缓存，时间: {}", time);
    //     try {
    //         Thread.sleep(500);
    //         log.info("【定时任务-缓存刷新】缓存刷新完成");
    //     } catch (InterruptedException e) {
    //         log.error("【定时任务-缓存刷新】执行失败", e);
    //         Thread.currentThread().interrupt();
    //     }
    // }

    /*
     * 健康检查任务示例 - 每5分钟检查一次系统状态
     */
    // @Scheduled(fixedRate = 300000)
    // public void healthCheck() {
    //     String time = LocalDateTime.now().format(formatter);
    //     log.info("【定时任务-健康检查】开始系统健康检查，时间: {}", time);
    //     // ...
    // }
}
