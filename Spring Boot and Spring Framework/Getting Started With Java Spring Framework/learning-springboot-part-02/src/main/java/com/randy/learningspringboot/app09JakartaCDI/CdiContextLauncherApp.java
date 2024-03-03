package com.randy.learningspringboot.app09JakartaCDI;

import jakarta.inject.Inject;
import jakarta.inject.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

//CDI is another way to use components and inject. Spring is compatible with them, they are not needed though.

@Component
class DataService {
}

//@Component
@Named
class BusinessService{
    private DataService dataService;

//    @Autowired
    @Inject
    public BusinessService(DataService dataService) {
        this.dataService = dataService;
        System.out.println("Setter Injection");
    }

    public DataService getDataService() {
        return dataService;
    }
}
@Configuration
@ComponentScan
public class CdiContextLauncherApp {

    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(CdiContextLauncherApp.class);) {
            System.out.println(context.getBean(BusinessService.class).getDataService());
        }
    }
}
