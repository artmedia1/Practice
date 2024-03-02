package com.randy.learningspringboot.app02springbeansbeginner;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AppGamingSpring {
    public static void main(String[] args){
        // Step 1
        // Configure the things we want Spring to manage - @Configuration
        // Step 2
        // Launch a Spring Context
        try(var context = new AnnotationConfigApplicationContext(AppGamingSpringConfiguration.class)){
            System.out.println(context.getBean("name"));
            System.out.println(context.getBean("age"));
            System.out.println(context.getBean("person"));
            System.out.println(context.getBean("address2"));
            System.out.println(context.getBean("person2MethodClass"));
            System.out.println(context.getBean("person3Parameters"));
            System.out.println(context.getBean("person4Parameters")); //This showcases @Primary
            System.out.println(context.getBean("person5Qualifier"));
            System.out.println(context.getBean(Person.class)); //This showcases @Primary
//        System.out.println(context.getBeanDefinitionNames().getClass().getName());
//        Arrays.stream(context.getBeanDefinitionNames()).forEach(System.out::println);
        }


    }
}
