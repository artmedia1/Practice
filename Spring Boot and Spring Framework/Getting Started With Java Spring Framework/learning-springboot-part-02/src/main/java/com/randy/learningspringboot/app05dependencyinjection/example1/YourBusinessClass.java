package com.randy.learningspringboot.app05dependencyinjection.example1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class YourBusinessClass {

    Dependency1 dependency1;
    Dependency2 dependency2;

    //Constructor injection is automatically done, does not need @Autowired
    public YourBusinessClass(Dependency1 dependency1, Dependency2 dependency2) {
        System.out.println("Constructor Injection");
        this.dependency1 = dependency1;
        this.dependency2 = dependency2;
    }

    public String toString() {
        StringBuffer sb = new StringBuffer();
        sb.append("Using ");
        sb.append(dependency1);
        sb.append(" and ");
        sb.append(dependency2);
        return sb.toString();
    }
}
