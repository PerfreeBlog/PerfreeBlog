package com.perfree.service;

import com.perfree.model.Theme;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThemeService {
    public List<Theme> getAllTheme() {
        return null;
    }

    public static void main(String[] args) {
        new ThemeService().getAllTheme();
    }
}
