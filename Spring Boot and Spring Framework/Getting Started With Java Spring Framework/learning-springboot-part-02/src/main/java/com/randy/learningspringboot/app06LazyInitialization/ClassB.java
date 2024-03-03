package com.randy.learningspringboot.app06LazyInitialization;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
@Lazy
public class ClassB {
    ClassA classA;

    public ClassB(ClassA classA){
        //logic
        System.out.println("Some Initialization logic");
        this.classA = classA;
    }
}
