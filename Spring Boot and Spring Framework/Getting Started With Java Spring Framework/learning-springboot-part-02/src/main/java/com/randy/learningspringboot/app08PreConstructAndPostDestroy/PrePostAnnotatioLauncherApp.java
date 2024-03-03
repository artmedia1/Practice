package com.randy.learningspringboot.app08PreConstructAndPostDestroy;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class PrePostAnnotatioLauncherApp {

    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(PrePostAnnotatioLauncherApp.class);) {
        }
    }
}
