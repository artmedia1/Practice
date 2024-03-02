package com.randy.learningspringboot.game;

import com.randy.learningspringboot.game.GameRunner;
import com.randy.learningspringboot.game.GamingConsole;
import com.randy.learningspringboot.game.MarioGame;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GamingConfiguration {

    @Bean
    public GamingConsole game() {
        var game = new MarioGame();
        return game;
    }

    @Bean
    public GameRunner gameRunner(GamingConsole game) {
        var gameRunner = new GameRunner(game);
        return gameRunner;
    }

//    var game = new SuperContraGame();
//    var game = new MarioGame();
//    var gameRunner = new GameRunner(game);
//    gameRunner.run();
}
