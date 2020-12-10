package com.xwt;

import com.perfree.config.WebMvcConfig;
import com.perfree.plugins.Plugin;

import java.net.URL;

public class TestPlugin implements Plugin {
    @Override
    public void onStart() {

    }

    @Override
    public void configEngine() {
        URL url = TestPlugin.class.getClassLoader().getResource("");
        System.out.println(url.getFile());
        WebMvcConfig.registry.addResourceHandler("/**").addResourceLocations(url.getFile());
    }
}
