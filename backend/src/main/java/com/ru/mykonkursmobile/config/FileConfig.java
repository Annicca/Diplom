package com.ru.mykonkursmobile.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
@EnableWebMvc
public class FileConfig implements WebMvcConfigurer {
//    @Value("${upload.path}")
    private Path uploadPath = Paths.get("src", "main", "resources");

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/**", "/rules/**")
                .addResourceLocations("classpath:/img/","classpath:/rules/");
//                .addResourceLocations("/resources" + "/img/", "/resources" + "/rules/");
    }
}
