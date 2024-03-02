import com.randy.learningspringboot.game.GameRunner;
import com.randy.learningspringboot.game.MarioGame;

public class AppGamingVanilla {
    public static void main(String[] args){
        //var game = new SuperContraGame();
        var game = new MarioGame();
        var gameRunner = new GameRunner(game);
        gameRunner.run();
    }
}
