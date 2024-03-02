package com.randy.learningspringboot.app05dependencyinjection.game;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;



@Configuration
@ComponentScan
public class AppGamingSpringBean {

    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppGamingSpringBean.class);) {
            context.getBean(GamingConsole.class).up();
            context.getBean(GameRunner.class).run();

            Arrays.stream(context.getBeanDefinitionNames()).forEach(System.out::println);
        }
    }
}
