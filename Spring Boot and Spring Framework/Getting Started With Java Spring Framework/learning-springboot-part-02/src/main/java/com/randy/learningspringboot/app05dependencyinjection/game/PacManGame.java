package com.randy.learningspringboot.app05dependencyinjection.game;

import org.springframework.stereotype.Component;

@Component
public class PacManGame implements GamingConsole {
    public String getName(){
        return("PacManGame");
    }
    public void up(){
        System.out.println("Move Up");
    }

    public void down(){
        System.out.println("Move Down");
    }

    public void left(){
        System.out.println("Move Left");
    }

    public void right(){
        System.out.println("Move Right");
    }
}
