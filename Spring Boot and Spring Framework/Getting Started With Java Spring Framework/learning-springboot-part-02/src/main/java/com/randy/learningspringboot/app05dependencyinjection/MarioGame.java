package com.randy.learningspringboot.app05dependencyinjection;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class MarioGame implements GamingConsole {
    public String getName(){
        return("MarioGame");
    }
    public void up(){
        System.out.println("Jump");
    }

    public void down(){
        System.out.println("Go Down Pipe");
    }

    public void left(){
        System.out.println("Move Left");
    }

    public void right(){
        System.out.println("Move Right");
    }
}
