
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@ComponentScan
public class BeanScopesApplicationLauncher {

    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(BeanScopesApplicationLauncher.class);) {
        }
    }
}
