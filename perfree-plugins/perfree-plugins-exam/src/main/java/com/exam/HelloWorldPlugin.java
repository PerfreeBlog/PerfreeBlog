package com.exam;

import com.perfree.plugins.Plugin;

public class HelloWorldPlugin implements Plugin {
    @Override
    public void onStart() {
        System.out.println("123456456456456455456");
    }

    @Override
    public void configEngine() {
    }
}
