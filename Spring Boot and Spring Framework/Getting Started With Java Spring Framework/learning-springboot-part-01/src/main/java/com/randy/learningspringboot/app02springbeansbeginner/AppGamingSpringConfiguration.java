package com.randy.learningspringboot.app02springbeansbeginner;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

record Person(String name, int age, Address address){};
record Address(String firstLine, String secondLine) {
}

@Configuration
public class AppGamingSpringConfiguration {
    @Bean
    public String name(){
        return "Randy";
    }

    @Bean
    public Integer age(){
        return 15;
    }

    @Bean
    public Person person(){
        var person = new Person("Randy", 20, new Address("Test", "Test2"));
        return person;
    }

    @Bean
    public Person person2MethodClass(){
        var person = new Person(name(), age(), address2());
        return person;
    }

    @Bean
    public Person person3Parameters(String name, int age, Address address2){
        var person = new Person(name, age, address2);
        return person;
    }

    @Bean
    @Primary
    public Person person4Parameters(String name, int age, Address address){ //This showcases @Primary, takes the primary Address
        var person = new Person(name, age, address);
        return person;
    }

    @Bean

    public Person person5Qualifier(String name, int age, @Qualifier("address3qualifier") Address address){
        var person = new Person(name, age, address);
        return person;
    }
//    @Bean
//    public com.randy.learningspringboot.springbeans.Address address() {
//        return new com.randy.learningspringboot.springbeans.Address("123 Main St", "Springfield");
//    }
    @Bean(name = "address2")
    @Primary
    public Address address2() {
        return new Address("123 Main St", "Primary Springfield");
    }
    @Bean(name = "address3")
    @Qualifier("address3qualifier")
    public Address address3() {
        return new Address("231 Main St", "Qualifier Springfield");
    }
}
