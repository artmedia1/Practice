package com.randy.learningspringboot.game;

public class SuperContraGame implements GamingConsole{
    public String getName(){
        return("SuperContraGame");
    }

    public void up(){
        System.out.println("Jump");
    }

    public void down(){
        System.out.println("Crouch");
    }

    public void left(){
        System.out.println("Move Left");
    }

    public void right(){
        System.out.println("Move Right");
    }
}
