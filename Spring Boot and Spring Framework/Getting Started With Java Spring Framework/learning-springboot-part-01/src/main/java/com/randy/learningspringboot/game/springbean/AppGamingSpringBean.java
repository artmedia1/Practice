package com.randy.learningspringboot.game.springbean;

import com.randy.learningspringboot.game.GameRunner;
import com.randy.learningspringboot.game.GamingConsole;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AppGamingSpringBean {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(GamingConfiguration.class);) {
            context.getBean(GamingConsole.class).up();
            context.getBean(GameRunner.class).run();
        }
    }
}
