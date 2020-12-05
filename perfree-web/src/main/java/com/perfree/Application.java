package com.perfree;

import com.perfree.template.CustomTag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.net.InetAddress;
import java.util.Date;

@SpringBootApplication
public class Application implements CommandLineRunner {
    private final Logger logger = LoggerFactory.getLogger(Application.class);
    @Value("${server.port}")
    private int serverPort;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        InetAddress address = InetAddress.getLocalHost();
        logger.info(new Date() + ", " + address + ":"+ serverPort +" >>>>>>>>已启动完成...");
    }

    @Bean
    public CustomTag custom(){
        return new CustomTag();
    }
}
