package com.randy.learningspringboot.app05dependencyinjection.example1;

import com.randy.learningspringboot.SimpleExample.app05dependencyinjection.GameRunner;
import com.randy.learningspringboot.SimpleExample.app05dependencyinjection.GamingConsole;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@ComponentScan
public class DepInjectionLauncherApplication {

    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(DepInjectionLauncherApplication.class);) {
            context.getBean(GamingConsole.class).up();
            context.getBean(GameRunner.class).run();

            Arrays.stream(context.getBeanDefinitionNames()).forEach(System.out::println);
        }
    }
}
