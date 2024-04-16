package com.randy.springboot.myfirstwebapp.login;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;


//@Controller
//public class LoginController {
//
//    private Logger logger = LoggerFactory.getLogger(getClass());
//    @RequestMapping("login")
//    public String gotoLoginPage(@RequestParam String name, @RequestParam int age, ModelMap model) {
//        model.put("name", name);
//        model.put("age", age);
//        logger.debug("Request param is {}, age {}", name, age);
//        logger.info("I want this printed at info level");
//        System.out.println("Request param is " + name + " " + age); //NOT RECOMMENDED FOR PROD CODE
//        return "login";
//    }
//}

@Controller
@SessionAttributes("name")
public class WelcomeController {
    @RequestMapping(value="/",method = RequestMethod.GET)
    public String gotoWelcomePage(ModelMap model) {
        model.put("name", getLoggedInUsername());
        return "welcome";
    }

    private String getLoggedInUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

}