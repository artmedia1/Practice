import com.randy.learningspringboot.game.AppGamingSpringConfiguration;
import com.randy.learningspringboot.game.GameRunner;
import com.randy.learningspringboot.game.MarioGame;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AppGamingSpring {
    public static void main(String[] args){
        // Step 1
        // Configure the things we want Spring to manage - @Configuration
        // Step 2
        // Launch a Spring Context
        var context = new AnnotationConfigApplicationContext(AppGamingSpringConfiguration.class);
        //
    }
}
