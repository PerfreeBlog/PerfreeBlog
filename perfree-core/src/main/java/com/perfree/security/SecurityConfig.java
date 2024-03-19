package com.perfree.security;

import com.perfree.security.filter.JwtAuthorizationFilter;
import com.perfree.security.service.SecurityFrameworkService;
import com.perfree.security.service.SecurityFrameworkServiceImpl;
import com.perfree.shared.api.permission.PermissionApi;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

/**
 * @author Perfree
 * @description Security配置
 * @date 15:37 2023/9/28
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalAuthentication
@EnableMethodSecurity
public class SecurityConfig {

    private final CorsFilter corsFilter;

    private final JwtAuthorizationFilter jwtAuthorizationFilter;

    @Bean("ss") // 使用 Spring Security 的缩写，方便使用
    public SecurityFrameworkService securityFrameworkService(PermissionApi permissionApi) {
        return new SecurityFrameworkServiceImpl(permissionApi);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request
                        .requestMatchers(
                                "/login",
                                "/register",
                                "/doRegister",
                                "/restPassword",
                                "/logout",
                                "/404",
                                "/500",
                                "/403",
                                "/api/401",
                                "/install",
                                "/static/**",
                                "/swagger**/**",
                                "/swagger-ui.html",
                                "/webjars/**",
                                "/doc.html",
                                "/static-plugin/**",
                                "/captcha**"
                            ).permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(manager -> manager.sessionCreationPolicy(STATELESS))
                //  配置跨域
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                //  将配置交由JWT
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
