package com.perfree;


import org.noear.solon.Solon;
import org.noear.solon.annotation.SolonMain;
import org.noear.solon.scheduling.annotation.EnableAsync;
import org.noear.solon.scheduling.annotation.EnableScheduling;

/**
 * @author Matuto
 * @description Application: Solon版 程序入口
 * @date 15:41 2025/9/1
 */
@SolonMain
@EnableAsync
@EnableScheduling
public class Application {

    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        Solon.start(Application.class, args);
        long times = System.currentTimeMillis() - start;
        System.out.println("(♥◠‿◠)ﾉﾞ  启动成功，耗时:【" + times + "ms】  ლ(´ڡ`ლ)ﾞ");
    }
}
