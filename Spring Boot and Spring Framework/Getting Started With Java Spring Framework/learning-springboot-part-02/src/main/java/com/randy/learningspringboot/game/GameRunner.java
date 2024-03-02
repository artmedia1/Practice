package com.randy.learningspringboot.game;

public class GameRunner {
    GamingConsole game;
    public GameRunner(GamingConsole game){
        this.game = game;
    }

    public void run() {
        System.out.println("Running game: " + game.getName());
        game.up();
        game.down();
        game.left();
        game.right();
    }
}
