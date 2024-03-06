//package com.randy.springboot.learnjpaandhibernate.course.jdbc;
//
//import com.randy.springboot.learnjpaandhibernate.course.Course;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class CourseJdbcCommandLineRunner implements CommandLineRunner {
//    @Autowired
//    private CourseJdbcRepository repository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        repository.insert(new Course(1,"Learn Spring Boot", "Randy Huynh"));
//        repository.insert(new Course(2,"Learn Spring Boot 2", "Randy Huynh"));
//        repository.insert(new Course(3,"Learn Spring Boot 3", "Randy Huynh"));
//        repository.deleteById(1);
//        System.out.println(repository.findById(3));
//    }
//}
