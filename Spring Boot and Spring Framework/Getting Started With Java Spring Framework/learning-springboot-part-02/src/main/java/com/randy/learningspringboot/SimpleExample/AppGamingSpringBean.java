package com.randy.learningspringboot.SimpleExample;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class AppGamingSpringBean {

    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppGamingSpringBean.class);) {
        }
    }
}
