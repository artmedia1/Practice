package com.randy.learningspringboot.game.app01vanillagame;

import com.randy.learningspringboot.game.GameRunner;
import com.randy.learningspringboot.game.MarioGame;

public class AppGamingVanilla {
    public static void main(String[] args){
        //var game = new SuperContraGame();
        var game = new MarioGame(); //1: Object Creation

        var gameRunner = new GameRunner(game);
        //2: Object Creation + Wiring of Dependencies
        // Game is a Dependency of GameRunner

        gameRunner.run();
    }
}
